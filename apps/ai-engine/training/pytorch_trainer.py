"""
PyTorch Training Orchestrator
Handles training loops, checkpointing, and metrics tracking for PyTorch models
"""
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import models, transforms
from pathlib import Path
import asyncio
import datetime
from typing import Dict, Any
import json

class PyTorchTrainer:
    def __init__(self, job_id: str, config: Any, training_jobs: Dict[str, Any]):
        self.job_id = job_id
        self.config = config
        self.training_jobs = training_jobs
        self.device = torch.device("cuda" if config.gpu_enabled and torch.cuda.is_available() else "cpu")
        self.model = None
        self.optimizer = None
        self.criterion = None
        self.checkpoints_dir = Path(f"./checkpoints/{job_id}")
        self.checkpoints_dir.mkdir(parents=True, exist_ok=True)
        self.logs_dir = Path(f"./logs")
        self.logs_dir.mkdir(parents=True, exist_ok=True)
        self.log_file = self.logs_dir / f"{job_id}.log"
    
    def log(self, message: str):
        """Write to log file"""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_line = f"[{timestamp}] {message}\n"
        with open(self.log_file, "a") as f:
            f.write(log_line)
        print(log_line.strip())
    
    def build_model(self):
        """Build the model based on architecture"""
        arch = self.config.architecture.lower()
        num_classes = self.config.dict().get("num_classes", 10)  # Default to 10 classes
        
        self.log(f"Building {arch} model for {num_classes} classes")
        
        if arch == "resnet18":
            self.model = models.resnet18(pretrained=self.config.pretrained)
            self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)
        elif arch == "resnet50":
            self.model = models.resnet50(pretrained=self.config.pretrained)
            self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)
        elif arch == "mobilenetv2":
            self.model = models.mobilenet_v2(pretrained=self.config.pretrained)
            self.model.classifier[1] = nn.Linear(self.model.classifier[1].in_features, num_classes)
        elif arch == "vgg16":
            self.model = models.vgg16(pretrained=self.config.pretrained)
            self.model.classifier[6] = nn.Linear(self.model.classifier[6].in_features, num_classes)
        else:
            # Simple CNN fallback
            self.model = nn.Sequential(
                nn.Conv2d(3, 32, 3, padding=1),
                nn.ReLU(),
                nn.MaxPool2d(2),
                nn.Conv2d(32, 64, 3, padding=1),
                nn.ReLU(),
                nn.MaxPool2d(2),
                nn.Flatten(),
                nn.Linear(64 * 56 * 56, 128),
                nn.ReLU(),
                nn.Linear(128, num_classes)
            )
        
        self.model = self.model.to(self.device)
        self.log(f"Model built and moved to {self.device}")
    
    def build_optimizer(self):
        """Build optimizer"""
        opt_name = self.config.optimizer.lower()
        lr = self.config.learning_rate
        
        if opt_name == "adam":
            self.optimizer = optim.Adam(self.model.parameters(), lr=lr)
        elif opt_name == "sgd":
            self.optimizer = optim.SGD(self.model.parameters(), lr=lr, momentum=0.9)
        elif opt_name == "adamw":
            self.optimizer = optim.AdamW(self.model.parameters(), lr=lr)
        else:
            self.optimizer = optim.Adam(self.model.parameters(), lr=lr)
        
        self.log(f"Optimizer: {opt_name} with lr={lr}")
    
    def build_criterion(self):
        """Build loss function"""
        if self.config.model_type.value == "CLASSIFICATION":
            self.criterion = nn.CrossEntropyLoss()
        elif self.config.model_type.value == "REGRESSION":
            self.criterion = nn.MSELoss()
        elif self.config.model_type.value == "DETECTION":
            # For object detection, would use specific loss
            self.criterion = nn.CrossEntropyLoss()
        else:
            self.criterion = nn.CrossEntropyLoss()
        
        self.log(f"Loss function: {self.criterion.__class__.__name__}")
    
    def create_dummy_dataset(self):
        """Create a dummy dataset for demonstration"""
        # In production, this would load the actual dataset
        class DummyDataset(Dataset):
            def __init__(self, num_samples=100):
                self.num_samples = num_samples
                self.transform = transforms.Compose([
                    transforms.ToPILImage(),
                    transforms.Resize((224, 224)),
                    transforms.ToTensor(),
                    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
                ])
            
            def __len__(self):
                return self.num_samples
            
            def __getitem__(self, idx):
                # Generate random image and label
                img = torch.randint(0, 255, (224, 224, 3), dtype=torch.uint8)
                label = idx % 10  # num_classes
                return self.transform(img), label
        
        train_dataset = DummyDataset(int(100 * self.config.train_split))
        val_dataset = DummyDataset(int(100 * self.config.val_split))
        
        train_loader = DataLoader(train_dataset, batch_size=self.config.batch_size, shuffle=True)
        val_loader = DataLoader(val_dataset, batch_size=self.config.batch_size, shuffle=False)
        
        return train_loader, val_loader
    
    def train_epoch(self, train_loader, epoch):
        """Train for one epoch"""
        self.model.train()
        total_loss = 0
        correct = 0
        total = 0
        
        for batch_idx, (data, target) in enumerate(train_loader):
            data, target = data.to(self.device), target.to(self.device)
            
            self.optimizer.zero_grad()
            output = self.model(data)
            loss = self.criterion(output, target)
            loss.backward()
            self.optimizer.step()
            
            total_loss += loss.item()
            _, predicted = output.max(1)
            total += target.size(0)
            correct += predicted.eq(target).sum().item()
            
            if batch_idx % 10 == 0:
                self.log(f"Epoch {epoch}, Batch {batch_idx}/{len(train_loader)}, Loss: {loss.item():.4f}")
        
        avg_loss = total_loss / len(train_loader)
        accuracy = 100. * correct / total
        
        return avg_loss, accuracy
    
    def validate(self, val_loader):
        """Validate the model"""
        self.model.eval()
        total_loss = 0
        correct = 0
        total = 0
        
        with torch.no_grad():
            for data, target in val_loader:
                data, target = data.to(self.device), target.to(self.device)
                output = self.model(data)
                loss = self.criterion(output, target)
                
                total_loss += loss.item()
                _, predicted = output.max(1)
                total += target.size(0)
                correct += predicted.eq(target).sum().item()
        
        avg_loss = total_loss / len(val_loader)
        accuracy = 100. * correct / total
        
        return avg_loss, accuracy
    
    def save_checkpoint(self, epoch, metrics):
        """Save model checkpoint"""
        checkpoint_path = self.checkpoints_dir / f"checkpoint_epoch_{epoch}.pt"
        torch.save({
            'epoch': epoch,
            'model_state_dict': self.model.state_dict(),
            'optimizer_state_dict': self.optimizer.state_dict(),
            'metrics': metrics,
        }, checkpoint_path)
        self.log(f"Checkpoint saved: {checkpoint_path}")
        return str(checkpoint_path)
    
    async def train(self):
        """Main training loop"""
        try:
            self.log("Starting PyTorch training")
            self.log(f"Configuration: {self.config.dict()}")
            
            # Build components
            self.build_model()
            self.build_optimizer()
            self.build_criterion()
            
            # Create dataloaders
            train_loader, val_loader = self.create_dummy_dataset()
            self.log(f"Dataset loaded: {len(train_loader.dataset)} train samples, {len(val_loader.dataset)} val samples")
            
            # Training loop
            best_val_acc = 0
            metrics_history = []
            
            for epoch in range(1, self.config.epochs + 1):
                # Check if training was stopped
                if self.training_jobs[self.job_id]["status"].value != "RUNNING":
                    self.log("Training stopped by user")
                    break
                
                start_time = datetime.datetime.now()
                
                # Train
                train_loss, train_acc = self.train_epoch(train_loader, epoch)
                
                # Validate
                val_loss, val_acc = self.validate(val_loader)
                
                # Calculate ETA
                elapsed = (datetime.datetime.now() - start_time).total_seconds()
                remaining_epochs = self.config.epochs - epoch
                eta = datetime.datetime.now() + datetime.timedelta(seconds=elapsed * remaining_epochs)
                
                # Update metrics
                metrics = {
                    "epoch": epoch,
                    "train_loss": train_loss,
                    "train_acc": train_acc,
                    "val_loss": val_loss,
                    "val_acc": val_acc
                }
                metrics_history.append(metrics)
                
                # Update job status
                self.training_jobs[self.job_id]["current_epoch"] = epoch
                self.training_jobs[self.job_id]["progress"] = (epoch / self.config.epochs) * 100
                self.training_jobs[self.job_id]["live_metrics"] = metrics
                self.training_jobs[self.job_id]["metrics_history"] = metrics_history
                self.training_jobs[self.job_id]["estimated_eta"] = eta.isoformat()
                
                self.log(f"Epoch {epoch}/{self.config.epochs} - Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.2f}%, Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%")
                
                # Save checkpoint
                if epoch % self.config.checkpoint_frequency == 0:
                    checkpoint_path = self.save_checkpoint(epoch, metrics)
                
                # Save best model
                if val_acc > best_val_acc:
                    best_val_acc = val_acc
                    best_model_path = self.checkpoints_dir / "best_model.pt"
                    torch.save(self.model.state_dict(), best_model_path)
                    self.log(f"New best model saved with val_acc: {val_acc:.2f}%")
                
                # Early stopping check
                if self.config.early_stopping and epoch > 5:
                    recent_metrics = metrics_history[-5:]
                    val_losses = [m["val_loss"] for m in recent_metrics]
                    if all(val_losses[i] >= val_losses[i-1] for i in range(1, len(val_losses))):
                        self.log("Early stopping triggered - validation loss not improving")
                        break
                
                # Small async sleep to allow other tasks
                await asyncio.sleep(0.1)
            
            # Final save
            final_model_path = self.checkpoints_dir / "final_model.pt"
            torch.save(self.model.state_dict(), final_model_path)
            
            # Update final metrics
            self.training_jobs[self.job_id]["metrics"] = {
                "best_val_accuracy": best_val_acc,
                "final_train_loss": train_loss,
                "final_val_loss": val_loss
            }
            self.training_jobs[self.job_id]["artifactUrl"] = str(final_model_path)
            
            self.log(f"Training completed! Best validation accuracy: {best_val_acc:.2f}%")
            
        except Exception as e:
            self.log(f"Training failed with error: {str(e)}")
            raise
