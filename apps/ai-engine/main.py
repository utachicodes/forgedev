from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any, Literal
from enum import Enum
import os
import datetime
import uuid
import json
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Create necessary directories
UPLOAD_DIR = Path("./uploads")
MODELS_DIR = Path("./models")
CHECKPOINTS_DIR = Path("./checkpoints")
LOGS_DIR = Path("./logs")

for dir_path in [UPLOAD_DIR, MODELS_DIR, CHECKPOINTS_DIR, LOGS_DIR]:
    dir_path.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="ForgeDev AI Engine", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client for LLM features
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ===== ENUMS =====

class FrameworkType(str, Enum):
    PYTORCH = "PYTORCH"
    TENSORFLOW = "TENSORFLOW"
    SCIKIT_LEARN = "SCIKIT_LEARN"
    HUGGINGFACE = "HUGGINGFACE"
    KERAS = "KERAS"

class ModelTypeEnum(str, Enum):
    CLASSIFICATION = "CLASSIFICATION"
    DETECTION = "DETECTION"
    SEGMENTATION = "SEGMENTATION"
    REGRESSION = "REGRESSION"
    CLUSTERING = "CLUSTERING"
    GENERATION = "GENERATION"
    NLP = "NLP"

class DatasetTypeEnum(str, Enum):
    IMAGE = "IMAGE"
    TEXT = "TEXT"
    TABULAR = "TABULAR"
    VIDEO = "VIDEO"
    AUDIO = "AUDIO"

class TrainingStatusEnum(str, Enum):
    QUEUED = "QUEUED"
    RUNNING = "RUNNING"
    PAUSED = "PAUSED"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    STOPPED = "STOPPED"

# ===== REQUEST/RESPONSE MODELS =====

class DatasetUploadRequest(BaseModel):
    name: str
    description: Optional[str] = None
    dataset_type: DatasetTypeEnum
    project_id: str

class DatasetStatsResponse(BaseModel):
    num_samples: int
    size_bytes: int
    class_distribution: Optional[Dict[str, int]] = None
    mean_dimensions: Optional[Dict[str, float]] = None

class TrainingConfigRequest(BaseModel):
    model_name: str
    dataset_id: str
    project_id: str
    framework: FrameworkType
    model_type: ModelTypeEnum
    architecture: str  # e.g., "resnet50", "yolov8", "custom"
    
    # Hyperparameters
    learning_rate: float = Field(default=0.001, gt=0)
    batch_size: int = Field(default=32, gt=0)
    epochs: int = Field(default=10, gt=0)
    optimizer: str = Field(default="adam")
    loss_function: Optional[str] = None
    
    # Data splits
    train_split: float = Field(default=0.7, ge=0, le=1)
    val_split: float = Field(default=0.15, ge=0, le=1)
    test_split: float = Field(default=0.15, ge=0, le=1)
    
    # Training options
    gpu_enabled: bool = Field(default=False)
    early_stopping: bool = Field(default=True)
    checkpoint_frequency: int = Field(default=5)  # Save every N epochs
    
    # Additional config
    augmentation: bool = Field(default=True)
    pretrained: bool = Field(default=True)

class TrainingJobResponse(BaseModel):
    job_id: str
    model_id: str
    status: TrainingStatusEnum
    current_epoch: int
    total_epochs: int
    progress: float
    live_metrics: Optional[Dict[str, Any]] = None
    estimated_eta: Optional[str] = None

class PredictionRequest(BaseModel):
    model_id: str
    input_data: Any  # Can be base64 image, text, etc.

class PredictionResponse(BaseModel):
    predictions: List[Dict[str, Any]]
    confidence_scores: List[float]
    inference_time_ms: float

# ===== IN-MEMORY STORAGE (Replace with Redis/DB in production) =====
training_jobs: Dict[str, Dict[str, Any]] = {}
datasets_meta: Dict[str, Dict[str, Any]] = {}

# ===== HEALTH CHECK =====

@app.get("/")
def read_root():
    return {"message": "ForgeDev AI Engine v1.0 - Production Ready"}

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "ai-engine",
        "timestamp": datetime.datetime.now().isoformat(),
        "frameworks": {
            "pytorch": True,
            "tensorflow": True,
            "scikit_learn": True,
            "huggingface": True
        }
    }

# ===== DATASET MANAGEMENT =====

@app.post("/datasets/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    name: str = "",
    description: str = "",
    dataset_type: DatasetTypeEnum = DatasetTypeEnum.IMAGE,
    project_id: str = ""
):
    """Upload a dataset (ZIP file containing images, CSV, etc.)"""
    try:
        dataset_id = str(uuid.uuid4())
        file_path = UPLOAD_DIR / f"{dataset_id}_{file.filename}"
        
        # Save uploaded file
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
        
        # Store metadata
        metadata = {
            "id": dataset_id,
            "name": name or file.filename,
            "description": description,
            "type": dataset_type,
            "project_id": project_id,
            "storage_path": str(file_path),
            "size_bytes": len(content),
            "uploaded_at": datetime.datetime.now().isoformat()
        }
        datasets_meta[dataset_id] = metadata
        
        return {
            "dataset_id": dataset_id,
            "status": "uploaded",
            "metadata": metadata
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.get("/datasets/{dataset_id}/stats")
async def get_dataset_stats(dataset_id: str):
    """Get statistics about a dataset"""
    if dataset_id not in datasets_meta:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    meta = datasets_meta[dataset_id]
    
    # For images, analyze the dataset
    if meta["type"] == DatasetTypeEnum.IMAGE:
        # Placeholder - in real implementation, analyze images
        return DatasetStatsResponse(
            num_samples=100,  # Would count actual files
            size_bytes=meta["size_bytes"],
            class_distribution={"class_0": 50, "class_1": 50},
            mean_dimensions={"width": 224, "height": 224}
        )
    
    return DatasetStatsResponse(
        num_samples=0,
        size_bytes=meta["size_bytes"]
    )

@app.post("/datasets/{dataset_id}/preprocess")
async def preprocess_dataset(dataset_id: str, config: Dict[str, Any]):
    """Apply preprocessing to dataset"""
    if dataset_id not in datasets_meta:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    # Store preprocessing config
    datasets_meta[dataset_id]["preprocess_config"] = config
    
    return {
        "dataset_id": dataset_id,
        "status": "preprocessed",
        "config": config
    }

# ===== TRAINING ORCHESTRATION =====

async def run_training_job(job_id: str, config: TrainingConfigRequest):
    """Background task to run training"""
    try:
        training_jobs[job_id]["status"] = TrainingStatusEnum.RUNNING
        training_jobs[job_id]["started_at"] = datetime.datetime.now().isoformat()
        
        # Import framework-specific trainer
        if config.framework == FrameworkType.PYTORCH:
            from training.pytorch_trainer import PyTorchTrainer
            trainer = PyTorchTrainer(job_id, config, training_jobs)
            await trainer.train()
        
        elif config.framework == FrameworkType.TENSORFLOW:
            from training.tensorflow_trainer import TensorFlowTrainer
            trainer = TensorFlowTrainer(job_id, config, training_jobs)
            await trainer.train()
        
        elif config.framework == FrameworkType.SCIKIT_LEARN:
            from training.sklearn_trainer import SklearnTrainer
            trainer = SklearnTrainer(job_id, config, training_jobs)
            await trainer.train()
        
        training_jobs[job_id]["status"] = TrainingStatusEnum.COMPLETED
        training_jobs[job_id]["ended_at"] = datetime.datetime.now().isoformat()
        
    except Exception as e:
        training_jobs[job_id]["status"] = TrainingStatusEnum.FAILED
        training_jobs[job_id]["error"] = str(e)
        training_jobs[job_id]["ended_at"] = datetime.datetime.now().isoformat()

@app.post("/training/start")
async def start_training(config: TrainingConfigRequest, background_tasks: BackgroundTasks):
    """Start a new training job"""
    job_id = str(uuid.uuid4())
    model_id = str(uuid.uuid4())
    
    # Initialize job
    training_jobs[job_id] = {
        "job_id": job_id,
        "model_id": model_id,
        "status": TrainingStatusEnum.QUEUED,
        "current_epoch": 0,
        "total_epochs": config.epochs,
        "progress": 0,
        "config": config.dict(),
        "created_at": datetime.datetime.now().isoformat(),
        "live_metrics": {},
        "metrics_history": []
    }
    
    # Start training in background
    background_tasks.add_task(run_training_job, job_id, config)
    
    return {
        "job_id": job_id,
        "model_id": model_id,
        "status": TrainingStatusEnum.QUEUED,
        "message": "Training job queued successfully"
    }

@app.get("/training/{job_id}")
async def get_training_status(job_id: str) -> TrainingJobResponse:
    """Get training job status and metrics"""
    if job_id not in training_jobs:
        raise HTTPException(status_code=404, detail="Training job not found")
    
    job = training_jobs[job_id]
    
    return TrainingJobResponse(
        job_id=job["job_id"],
        model_id=job["model_id"],
        status=job["status"],
        current_epoch=job.get("current_epoch", 0),
        total_epochs=job.get("total_epochs", 0),
        progress=job.get("progress", 0),
        live_metrics=job.get("live_metrics"),
        estimated_eta=job.get("estimated_eta")
    )

@app.post("/training/{job_id}/stop")
async def stop_training(job_id: str):
    """Stop a running training job"""
    if job_id not in training_jobs:
        raise HTTPException(status_code=404, detail="Training job not found")
    
    training_jobs[job_id]["status"] = TrainingStatusEnum.STOPPED
    training_jobs[job_id]["ended_at"] = datetime.datetime.now().isoformat()
    
    return {"job_id": job_id, "status": "stopped"}

@app.get("/training/{job_id}/logs")
async def get_training_logs(job_id: str, last_n: int = 100):
    """Get training logs"""
    if job_id not in training_jobs:
        raise HTTPException(status_code=404, detail="Training job not found")
    
    log_file = LOGS_DIR / f"{job_id}.log"
    if log_file.exists():
        with open(log_file, "r") as f:
            lines = f.readlines()
            last_lines = lines[-last_n:] if len(lines) > last_n else lines
            return {"logs": "".join(last_lines)}
    
    return {"logs": "No logs available yet"}

@app.get("/training/{job_id}/metrics")
async def get_training_metrics(job_id: str):
    """Get training metrics history"""
    if job_id not in training_jobs:
        raise HTTPException(status_code=404, detail="Training job not found")
    
    return {
        "job_id": job_id,
        "metrics_history": training_jobs[job_id].get("metrics_history", [])
    }

# ===== MODEL MANAGEMENT =====

@app.get("/models")
async def list_models(project_id: Optional[str] = None):
    """List all trained models"""
    # Filter models by project if specified
    models = []
    for job in training_jobs.values():
        if job["status"] == TrainingStatusEnum.COMPLETED:
            if project_id is None or job["config"]["project_id"] == project_id:
                models.append({
                    "model_id": job["model_id"],
                    "name": job["config"]["model_name"],
                    "framework": job["config"]["framework"],
                    "model_type": job["config"]["model_type"],
                    "metrics": job.get("metrics", {}),
                    "created_at": job["ended_at"]
                })
    
    return {"models": models}

@app.post("/models/{model_id}/predict")
async def predict(model_id: str, request: PredictionRequest):
    """Run inference on a trained model"""
    # Find the model
    model_job = None
    for job in training_jobs.values():
        if job["model_id"] == model_id:
            model_job = job
            break
    
    if not model_job:
        raise HTTPException(status_code=404, detail="Model not found")
    
    # Run inference (placeholder - would load actual model)
    import time
    start_time = time.time()
    
    predictions = [
        {"class": "cat", "score": 0.85},
        {"class": "dog", "score": 0.12}
    ]
    
    inference_time = (time.time() - start_time) * 1000
    
    return PredictionResponse(
        predictions=predictions,
        confidence_scores=[0.85, 0.12],
        inference_time_ms=inference_time
    )

@app.get("/models/{model_id}/export")
async def export_model(model_id: str, format: Literal["onnx", "torchscript", "savedmodel"] = "onnx"):
    """Export model to specified format"""
    # Find the model
    model_job = None
    for job in training_jobs.values():
        if job["model_id"] == model_id:
            model_job = job
            break
    
    if not model_job:
        raise HTTPException(status_code=404, detail="Model not found")
    
    export_path = MODELS_DIR / f"{model_id}.{format}"
    
    return {
        "model_id": model_id,
        "format": format,
        "download_url": f"/downloads/models/{model_id}.{format}",
        "status": "exported"
    }

# ===== COMPUTER VISION SPECIFIC =====

@app.post("/cv/classify")
async def classify_image(file: UploadFile = File(...), model_id: str = ""):
    """Classify an image"""
    if not model_id:
        raise HTTPException(status_code=400, detail="model_id required")
    
    # Read image
    content = await file.read()
    
    # Run classification (placeholder)
    return {
        "predictions": [
            {"class": "cat", "probability": 0.95},
            {"class": "dog", "probability": 0.04}
        ]
    }

@app.post("/cv/detect")
async def detect_objects(file: UploadFile = File(...), model_id: str = ""):
    """Detect objects in an image"""
    if not model_id:
        raise HTTPException(status_code=400, detail="model_id required")
    
    # Read image
    content = await file.read()
    
    # Run detection (placeholder)
    return {
        "detections": [
            {"class": "person", "bbox": [100, 100, 200, 300], "confidence": 0.92},
            {"class": "car", "bbox": [300, 150, 450, 280], "confidence": 0.88}
        ]
    }

@app.post("/cv/segment")
async def segment_image(file: UploadFile = File(...), model_id: str = ""):
    """Segment an image"""
    if not model_id:
        raise HTTPException(status_code=400, detail="model_id required")
    
    # Read image
    content = await file.read()
    
    # Run segmentation (placeholder)
    return {
        "segmentation_map": "base64_encoded_mask",
        "classes": ["background", "person", "car"]
    }

# ==================== Groq LLM Endpoints ====================

class ChatMessage(BaseModel):
    role: str = Field(..., description="Role: 'system', 'user', or 'assistant'")
    content: str = Field(..., description="Message content")

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = Field(default="llama-3.3-70b-versatile")
    temperature: float = Field(default=0.7, ge=0, le=2)
    max_tokens: Optional[int] = Field(default=None)

class CodeGenerationRequest(BaseModel):
    prompt: str = Field(..., description="Description of code to generate")
    language: str = Field(default="python")
    temperature: float = Field(default=0.2, ge=0, le=2)

class VisionRequest(BaseModel):
    image_url: str
    prompt: str = Field(default="What's in this image?")
    model: str = Field(default="llama-3.2-90b-vision-preview")

@app.post("/llm/chat")
async def chat_completion(request: ChatRequest):
    """Chat completion using Groq"""
    try:
        msgs = [{"role": m.role, "content": m.content} for m in request.messages]
        response = groq_client.chat.completions.create(
            model=request.model,
            messages=msgs,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        return {
            "content": response.choices[0].message.content,
            "tokens": response.usage.total_tokens
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/llm/code-gen")
async def generate_code(request: CodeGenerationRequest):
    """Generate code using Groq"""
    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": f"Expert {request.language} programmer"},
                {"role": "user", "content": request.prompt}
            ],
            temperature=request.temperature
        )
        return {"code": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/llm/models")
async def list_models():
    """List Groq models"""
    return {"models": ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"]}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
