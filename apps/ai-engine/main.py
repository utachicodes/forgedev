from fastapi import FastAPI
import redis
import os
import datetime

app = FastAPI()

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
r = redis.from_url(redis_url)

@app.get("/")
def read_root():
    return {"message": "ForgeDev AI Engine Operational"}

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "ai-engine",
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.post("/train/stub")
def train_model_stub(model_type: str = "resnet50"):
    # Simulate a training job
    job_id = f"job-{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}"
    r.set(job_id, "queued")
    return {"job_id": job_id, "status": "queued", "model": model_type}

from pydantic import BaseModel

class GenRequest(BaseModel):
    prompt: str
    framework: str = "react"

@app.post("/generate/component")
def generate_component(req: GenRequest):
    # Stub response
    code = f"""
import React from 'react';

export default function GeneratedComponent() {{
    return (
        <div className="p-4 rounded-lg border shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-2">Generated Result</h2>
            <p className="text-gray-600">{{req.prompt}}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Click Me
            </button>
        </div>
    );
}}
"""
    return {"code": code, "framework": req.framework, "status": "success"}
