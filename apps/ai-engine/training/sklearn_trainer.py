"""
Scikit-learn Training Orchestrator
Handles training for classical ML models (Random Forest, SVM, etc.)
"""
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report
from pathlib import Path
import asyncio
import datetime
from typing import Dict, Any
import numpy as np
import pickle

class SklearnTrainer:
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
    
    def log(self, message: str):
        """Write to log file"""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_line = f"[{timestamp}] {message}\n"
        with open(self.log_file, "a") as f:
            f.write(log_line)
        print(log_line.strip())
    
    def build_model(self):
        """Build scikit-learn model"""
        arch = self.config.architecture.lower()
        
        self.log(f"Building {arch} model")
        
        if arch == "randomforest":
            self.model = RandomForestClassifier(
                n_estimators=100,
                max_depth=None,
                random_state=42,
                n_jobs=-1
            )
        elif arch == "gradientboosting":
            self.model = GradientBoostingClassifier(
                n_estimators=100,
                learning_rate=self.config.learning_rate,
                max_depth=3,
                random_state=42
            )
        elif arch == "svm":
            self.model = SVC(
                kernel='rbf',
                C=1.0,
                random_state=42,
                probability=True
            )
        elif arch == "logisticregression":
            self.model = LogisticRegression(
                max_iter=1000,
                C=1.0,
                random_state=42,
                n_jobs=-1
            )
        else:
            # Default to Random Forest
            self.model = RandomForestClassifier(
                n_estimators=100,
                random_state=42,
                n_jobs=-1
            )
        
        self.log(f"Model: {self.model.__class__.__name__}")
    
    def create_dummy_dataset(self):
        """Create a dummy dataset for demonstration"""
        train_size = int(1000 * self.config.train_split)
        val_size = int(1000 * self.config.val_split)
        n_features = 100
        
        # Generate random tabular data
        x_train = np.random.randn(train_size, n_features)
        y_train = np.random.randint(0, 10, train_size)
        
        x_val = np.random.randn(val_size, n_features)
        y_val = np.random.randint(0, 10, val_size)
        
        self.log(f"Dataset created: {train_size} train samples, {val_size} val samples, {n_features} features")
        
        return (x_train, y_train), (x_val, y_val)
    
    async def train(self):
        """Main training loop"""
        try:
            self.log("Starting scikit-learn training")
            self.log(f"Configuration: {self.config.dict()}")
            
            # Build model
            self.build_model()
            
            # Create dataset
            (x_train, y_train), (x_val, y_val) = self.create_dummy_dataset()
            
            # Hyperparameter tuning (optional)
            if self.config.dict().get("hyperparameter_tuning", False):
                self.log("Performing hyperparameter tuning...")
                param_grid = {
                    'n_estimators': [50, 100, 200],
                    'max_depth': [None, 10, 20, 30]
                }
                grid_search = GridSearchCV(
                    self.model,
                    param_grid,
                    cv=5,
                    scoring='accuracy',
                    n_jobs=-1,
                    verbose=1
                )
                grid_search.fit(x_train, y_train)
                self.model = grid_search.best_estimator_
                self.log(f"Best parameters: {grid_search.best_params_}")
            
            # Update progress
            self.training_jobs[self.job_id]["current_epoch"] = 1
            self.training_jobs[self.job_id]["progress"] = 25
            
            # Cross-validation
            self.log("Performing cross-validation...")
            cv_scores = cross_val_score(self.model, x_train, y_train, cv=5, scoring='accuracy')
            self.log(f"Cross-validation scores: {cv_scores}")
            self.log(f"Mean CV accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")
            
            # Update progress
            self.training_jobs[self.job_id]["current_epoch"] = 2
            self.training_jobs[self.job_id]["progress"] = 50
            await asyncio.sleep(0.1)
            
            # Train final model
            self.log("Training final model...")
            self.model.fit(x_train, y_train)
            
            # Update progress
            self.training_jobs[self.job_id]["current_epoch"] = 3
            self.training_jobs[self.job_id]["progress"] = 75
            await asyncio.sleep(0.1)
            
            # Evaluate on validation set
            train_acc = accuracy_score(y_train, self.model.predict(x_train)) * 100
            val_acc = accuracy_score(y_val, self.model.predict(x_val)) * 100
            
            self.log(f"Training accuracy: {train_acc:.2f}%")
            self.log(f"Validation accuracy: {val_acc:.2f}%")
            
            # Get detailed classification report
            val_pred = self.model.predict(x_val)
            report = classification_report(y_val, val_pred, output_dict=True)
            self.log(f"Classification report:\n{classification_report(y_val, val_pred)}")
            
            # Update metrics
            metrics = {
                "epoch": 4,
                "train_acc": train_acc,
                "val_acc": val_acc,
                "cv_mean": cv_scores.mean() * 100,
                "cv_std": cv_scores.std() * 100
            }
            
            self.training_jobs[self.job_id]["current_epoch"] = 4
            self.training_jobs[self.job_id]["progress"] = 100
            self.training_jobs[self.job_id]["live_metrics"] = metrics
            self.training_jobs[self.job_id]["metrics_history"] = [metrics]
            
            # Save model
            model_path = self.checkpoints_dir / "model.pkl"
            with open(model_path, 'wb') as f:
                pickle.dump(self.model, f)
            
            self.log(f"Model saved to {model_path}")
            
            # Update final metrics
            self.training_jobs[self.job_id]["metrics"] = {
                "train_accuracy": train_acc,
                "val_accuracy": val_acc,
                "cv_mean_accuracy": cv_scores.mean() * 100,
                "precision": report['weighted avg']['precision'],
                "recall": report['weighted avg']['recall'],
                "f1_score": report['weighted avg']['f1-score']
            }
            self.training_jobs[self.job_id]["artifactUrl"] = str(model_path)
            
            self.log(f"Training completed! Validation accuracy: {val_acc:.2f}%")
            
        except Exception as e:
            self.log(f"Training failed with error: {str(e)}")
            raise
