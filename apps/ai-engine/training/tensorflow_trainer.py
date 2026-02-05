"""
TensorFlow/Keras Training Orchestrator
Handles training with TensorFlow and Keras models
"""
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models, optimizers
from pathlib import Path
import asyncio
import datetime
from typing import Dict, Any
import numpy as np

class TensorFlowTrainer:
    def __init__(self, job_id: str, config: Any, training_jobs: Dict[str, Any]):
        self.job_id = job_id
        self.config = config
        self.training_jobs = training_jobs
        self.model = None
        self.checkpoints_dir = Path(f"./checkpoints/{job_id}")
        self.checkpoints_dir.mkdir(parents=True, exist_ok=True)
        self.logs_dir = Path(f"./logs")
        self.logs_dir.mkdir(parents=True, exist_ok=True)
        self.log_file = self.logs_dir / f"{job_id}.log"
        
        # Set GPU configuration
        if self.config.gpu_enabled:
            gpus = tf.config.list_physical_devices('GPU')
            if gpus:
                try:
                    for gpu in gpus:
                        tf.config.experimental.set_memory_growth(gpu, True)
                except RuntimeError as e:
                    self.log(f"GPU configuration error: {e}")
    
    def log(self, message: str):
        """Write to log file"""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_line = f"[{timestamp}] {message}\n"
        with open(self.log_file, "a") as f:
            f.write(log_line)
        print(log_line.strip())
    
    def build_model(self):
        """Build the model using Keras functional API"""
        arch = self.config.architecture.lower()
        num_classes = self.config.dict().get("num_classes", 10)
        input_shape = (224, 224, 3)
        
        self.log(f"Building {arch} model for {num_classes} classes")
        
        if arch == "resnet50":
            base_model = keras.applications.ResNet50(
                include_top=False,
                weights='imagenet' if self.config.pretrained else None,
                input_shape=input_shape
            )
            x = base_model.output
            x = layers.GlobalAveragePooling2D()(x)
            x = layers.Dense(256, activation='relu')(x)
            x = layers.Dropout(0.5)(x)
            predictions = layers.Dense(num_classes, activation='softmax')(x)
            self.model = models.Model(inputs=base_model.input, outputs=predictions)
            
        elif arch == "mobilenetv2":
            base_model = keras.applications.MobileNetV2(
                include_top=False,
                weights='imagenet' if self.config.pretrained else None,
                input_shape=input_shape
            )
            x = base_model.output
            x = layers.GlobalAveragePooling2D()(x)
            x = layers.Dense(128, activation='relu')(x)
            predictions = layers.Dense(num_classes, activation='softmax')(x)
            self.model = models.Model(inputs=base_model.input, outputs=predictions)
            
        elif arch == "vgg16":
            base_model = keras.applications.VGG16(
                include_top=False,
                weights='imagenet' if self.config.pretrained else None,
                input_shape=input_shape
            )
            x = base_model.output
            x = layers.Flatten()(x)
            x = layers.Dense(256, activation='relu')(x)
            x = layers.Dropout(0.5)(x)
            predictions = layers.Dense(num_classes, activation='softmax')(x)
            self.model = models.Model(inputs=base_model.input, outputs=predictions)
            
        else:
            # Simple CNN fallback
            self.model = models.Sequential([
                layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
                layers.MaxPooling2D((2, 2)),
                layers.Conv2D(64, (3, 3), activation='relu'),
                layers.MaxPooling2D((2, 2)),
                layers.Conv2D(64, (3, 3), activation='relu'),
                layers.Flatten(),
                layers.Dense(128, activation='relu'),
                layers.Dropout(0.5),
                layers.Dense(num_classes, activation='softmax')
            ])
        
        self.log(f"Model built with {self.model.count_params():,} parameters")
    
    def compile_model(self):
        """Compile the model with optimizer and loss"""
        opt_name = self.config.optimizer.lower()
        lr = self.config.learning_rate
        
        if opt_name == "adam":
            optimizer = optimizers.Adam(learning_rate=lr)
        elif opt_name == "sgd":
            optimizer = optimizers.SGD(learning_rate=lr, momentum=0.9)
        elif opt_name == "adamw":
            optimizer = optimizers.AdamW(learning_rate=lr)
        else:
            optimizer = optimizers.Adam(learning_rate=lr)
        
        # Determine loss function
        if self.config.model_type.value == "CLASSIFICATION":
            loss = 'sparse_categorical_crossentropy'
            metrics = ['accuracy']
        elif self.config.model_type.value == "REGRESSION":
            loss = 'mse'
            metrics = ['mae']
        else:
            loss = 'sparse_categorical_crossentropy'
            metrics = ['accuracy']
        
        self.model.compile(
            optimizer=optimizer,
            loss=loss,
            metrics=metrics
        )
        
        self.log(f"Model compiled with {opt_name} optimizer (lr={lr}) and {loss} loss")
    
    def create_dummy_dataset(self):
        """Create a dummy dataset for demonstration"""
        train_size = int(100 * self.config.train_split)
        val_size = int(100 * self.config.val_split)
        
        # Generate random data
        x_train = np.random.rand(train_size, 224, 224, 3).astype(np.float32)
        y_train = np.random.randint(0, 10, train_size)
        
        x_val = np.random.rand(val_size, 224, 224, 3).astype(np.float32)
        y_val = np.random.randint(0, 10, val_size)
        
        self.log(f"Dataset created: {train_size} train samples, {val_size} val samples")
        
        return (x_train, y_train), (x_val, y_val)
    
    class TrainingCallback(keras.callbacks.Callback):
        """Custom callback to update training job status"""
        def __init__(self, trainer):
            super().__init__()
            self.trainer = trainer
        
        def on_epoch_end(self, epoch, logs=None):
            logs = logs or {}
            
            # Update metrics
            metrics = {
                "epoch": epoch + 1,
                "train_loss": float(logs.get('loss', 0)),
                "train_acc": float(logs.get('accuracy', 0)) * 100 if 'accuracy' in logs else 0,
                "val_loss": float(logs.get('val_loss', 0)),
                "val_acc": float(logs.get('val_accuracy', 0)) * 100 if 'val_accuracy' in logs else 0
            }
            
            # Update job status
            self.trainer.training_jobs[self.trainer.job_id]["current_epoch"] = epoch + 1
            self.trainer.training_jobs[self.trainer.job_id]["progress"] = ((epoch + 1) / self.trainer.config.epochs) * 100
            self.trainer.training_jobs[self.trainer.job_id]["live_metrics"] = metrics
            
            if "metrics_history" not in self.trainer.training_jobs[self.trainer.job_id]:
                self.trainer.training_jobs[self.trainer.job_id]["metrics_history"] = []
            self.trainer.training_jobs[self.trainer.job_id]["metrics_history"].append(metrics)
            
            self.trainer.log(
                f"Epoch {epoch+1}/{self.trainer.config.epochs} - "
                f"Loss: {metrics['train_loss']:.4f}, Acc: {metrics['train_acc']:.2f}%, "
                f"Val Loss: {metrics['val_loss']:.4f}, Val Acc: {metrics['val_acc']:.2f}%"
            )
    
    async def train(self):
        """Main training loop"""
        try:
            self.log("Starting TensorFlow/Keras training")
            self.log(f"Configuration: {self.config.dict()}")
            
            # Build and compile model
            self.build_model()
            self.compile_model()
            
            # Create dataset
            (x_train, y_train), (x_val, y_val) = self.create_dummy_dataset()
            
            # Setup callbacks
            callbacks = [
                self.TrainingCallback(self),
                keras.callbacks.ModelCheckpoint(
                    filepath=str(self.checkpoints_dir / "checkpoint_epoch_{epoch:02d}.h5"),
                    save_freq='epoch',
                    period=self.config.checkpoint_frequency,
                    save_best_only=False
                ),
                keras.callbacks.ModelCheckpoint(
                    filepath=str(self.checkpoints_dir / "best_model.h5"),
                    save_best_only=True,
                    monitor='val_accuracy',
                    mode='max'
                )
            ]
            
            if self.config.early_stopping:
                callbacks.append(
                    keras.callbacks.EarlyStopping(
                        monitor='val_loss',
                        patience=5,
                        restore_best_weights=True
                    )
                )
            
            # Train model
            history = self.model.fit(
                x_train, y_train,
                batch_size=self.config.batch_size,
                epochs=self.config.epochs,
                validation_data=(x_val, y_val),
                callbacks=callbacks,
                verbose=0
            )
            
            # Save final model
            final_model_path = self.checkpoints_dir / "final_model.h5"
            self.model.save(final_model_path)
            
            # Get best metrics
            best_val_acc = max(history.history.get('val_accuracy', [0])) * 100
            final_train_loss = history.history['loss'][-1]
            final_val_loss = history.history['val_loss'][-1]
            
            # Update final metrics
            self.training_jobs[self.job_id]["metrics"] = {
                "best_val_accuracy": best_val_acc,
                "final_train_loss": final_train_loss,
                "final_val_loss": final_val_loss
            }
            self.training_jobs[self.job_id]["artifactUrl"] = str(final_model_path)
            
            self.log(f"Training completed! Best validation accuracy: {best_val_acc:.2f}%")
            
        except Exception as e:
            self.log(f"Training failed with error: {str(e)}")
            raise
