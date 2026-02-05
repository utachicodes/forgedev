# Model Training Guide

Complete guide to configuring and running AI/ML training jobs on the ForgeDev platform.

## Overview

ForgeDev provides a unified interface for training machine learning models across multiple frameworks. This guide covers the Training Configuration Wizard and how to monitor your training jobs.

## Supported Frameworks

### PyTorch
- **Best for**: Deep learning, computer vision, NLP
- **Architectures**: ResNet, VGG, MobileNet, BERT, GPT, Custom
- **Features**: Dynamic computation graphs, extensive ecosystem

### TensorFlow
- **Best for**: Production deployment, mobile apps
- **Architectures**: EfficientNet, Inception, YOLO, Custom
- **Features**: Production-ready, TensorFlow Lite support

### Scikit-learn
- **Best for**: Classical ML, tabular data
- **Algorithms**: Random Forest, SVM, Gradient Boosting, Logistic Regression
- **Features**: Fast training, interpretable models

## Training Wizard

### Step 1: Select Framework  & Architecture

1. Navigate to **AI Training → Train**
2. Select your framework:

**PyTorch**:
- ResNet (18, 34, 50, 101, 152)
- VGG (11, 13, 16, 19)
- MobileNet (V2, V3)
- Custom architecture

**TensorFlow**:
- EfficientNet (B0-B7)
- Inception V3
- MobileNet V2
- Custom Keras model

**Scikit-learn**:
- Random Forest
- Gradient Boosting (XGBoost, LightGBM)
- Support Vector Machine
- Logistic Regression

**Model Type**:
- Image Classification
- Object Detection
- Regression
- Text Classification

3. Click "Next" to proceed

### Step 2: Select Dataset

1. Choose from your uploaded datasets
2. Filter by dataset type to see compatible options
3. Review dataset information:
   - Size (number of samples)
   - Type (matches your model type)
   - Upload date
   - Description

**Tips**:
- Ensure dataset type matches model type
- Verify dataset is "Ready" status
- Check dataset size is adequate for training

4. Select dataset and click "Next"

### Step 3: Configure Hyperparameters

Customize training parameters:

#### Learning Rate
- **Default**: 0.001
- **Range**: 0.00001 - 0.1
- **Guidance**: 
  - Lower: More stable but slower
  - Higher: Faster but may not converge
  - Start with default, adjust if needed

#### Batch Size
- **Default**: 32
- **Common values**: 16, 32, 64, 128
- **Considerations**:
  - Larger: Faster training, more memory
  - Smaller: Better generalization, less memory
  - Adjust based on GPU memory

#### Epochs
- **Default**: 10
- **Range**: 1 - 1000
- **Guidance**:
  - More epochs: Better fit but risk overfitting
  - Use early stopping to prevent overfitting
  - Monitor validation loss

#### Optimizer
- **Adam** (default): Adaptive learning, good general choice
- **SGD**: Classic, requires learning rate tuning
- **RMSprop**: Good for RNNs
- **AdamW**: Adam with weight decay

#### Loss Function

**For Classification**:
- Cross Entropy Loss (default)
- Binary Cross Entropy (binary classification)
- Focal Loss (imbalanced classes)

**For Regression**:
- Mean Squared Error (MSE)
- Mean Absolute Error (MAE)
- Huber Loss

#### Advanced Options

**Data Augmentation** (Image models):
- ✅ Recommended for small datasets
- Techniques: rotation, flip, brightness, contrast
- Helps prevent overfitting

**Pretrained Weights**:
- ✅ Use ImageNet weights (transfer learning)
- Faster convergence
- Better performance on small datasets

**Early Stopping**:
- ✅ Enabled: Stops if validation loss doesn't improve
- Patience: 5 epochs (default)
- Prevents overfitting

**Checkpoint Frequency**:
- **Every epoch** (default): Save after each epoch
- **Every 5 epochs**: Less frequent, saves storage
- **Best only**: Save only the best model

### Step 4: Hardware Configuration

#### Compute Options

**GPU (Recommended for Deep Learning)**:
- Faster training (10-100x speedup)
- Required for large models/datasets
- Higher cost
- Check: "Enable GPU Acceleration"

**CPU (For Classical ML)**:
- Sufficient for scikit-learn models
- Small datasets
- Prototyping
- Lower cost

**GPU Selection**:
- **T4**: Balanced performance/cost
- **V100**: High performance
- **A100**: Maximum performance

#### Resource Limits

Monitor resource usage:
- GPU Memory: Don't exceed 80%
- Training time estimate shown
- Cost estimate displayed

### Step 5: Review & Launch

Final review before starting:

**Configuration Summary**:
```
Framework: PyTorch
Architecture: ResNet50
Dataset: CIFAR-10 (50,000 images)
Learning Rate: 0.001
Batch Size: 64
Epochs: 50
Optimizer: Adam
GPU: Enabled (T4)
Estimated Time: 2 hours
```

**Checklist**:
- ✅ Framework and architecture selected
- ✅ Dataset is ready and compatible
- ✅ Hyperparameters configured
- ✅ Hardware allocation selected

**Actions**:
- **Start Training**: Begin immediately
- **back**: Modify configuration
- **Save as Template**: Reuse configuration later

Click "Start Training" to launch!

## Monitoring Training

### Real-Time Monitoring Dashboard

Navigate to **AI Training → Monitor → [Your Job]**

#### Training Metrics

**Loss Chart**:
- Training loss (blue line)
- Validation loss (orange line)
- X-axis: Epochs
- Y-axis: Loss value
- **Goal**: Both lines decreasing

**Accuracy Chart**:
- Training accuracy (blue line)
- Validation accuracy (orange line)
- X-axis: Epochs
- Y-axis: Accuracy (%)
- **Goal**: Both lines increasing

#### Live Logs

Real-time training output:
```
Epoch 1/50
[████████████████████] 100% | Loss: 2.304 | Acc: 45.2%
Validation: Loss: 2.156 | Acc: 48.1%

Epoch 2/50
[████████████████████] 100% | Loss: 1.842 | Acc: 52.7%
Validation: Loss: 1.756 | Acc: 54.3%

Epoch 3/50
[████████████████████] 100% | Loss: 1.534 | Acc: 58.9%
Validation: Loss: 1.498 | Acc: 60.2%
...
```

#### Training Progress

- **Current Epoch**: 12/50
- **Time Elapsed**: 24 minutes
- **Time Remaining**: ~1.5 hours
- **GPU Utilization**: 87%
- **Memory Used**: 8.2 GB / 16 GB

#### Control Actions

**Pause Training**:
- Temporarily stop training
- Resume later from checkpoint
- Useful for adjusting resources

**Stop Training**:
- Permanently end training
- Saves current best model
- Cannot be resumed

**Download Logs**:
- Export full training logs
- For detailed analysis
- Includes all metrics

## After Training Completes

### View Results

Navigate to **AI Training → Models** to see your trained model:

**Model Card Shows**:
- Final accuracy/metrics
- Training time
- Framework used
- Model size
- Created date

### Evaluate Model

**Metrics**:
- Accuracy: 94.2%
- Loss: 0.342
- Precision: 93.8%
- Recall: 94.6%
- F1 Score: 94.2%

**Confusion Matrix**:
- View classification performance
- Identify misclassified classes
- Understand model weaknesses

### Export Model

**Available Formats**:
- PyTorch (.pt, .pth)
- TensorFlow (SavedModel, .h5)
- ONNX (universal format)
- TorchScript (production PyTorch)

**Download**:
1. Click "Export" on model card
2. Select format
3. Download begins automatically

### Deploy Model

**Deployment Options**:
1. **ForgeDev Serving** create API endpoint
2. **Download & Self-Host**: Use on your infrastructure
3. **Edge Deployment**: Mobile/IoT devices

```bash
# Deploy via CLI
forge model deploy my-model-id \
  --name "production-classifier" \
  --instance t3.medium

# Get endpoint
# Model available at: https://api.forgedev.com/models/production-classifier
```

## Best Practices

### Data Preparation

✅ **DO**:
- Split data: 70% train, 15% validation, 15% test
- Balance classes (or use class weights)
- Normalize/standardize features
- Remove corrupted samples

❌ **DON'T**:
- Use all data for training
- Ignore data quality issues
- Mix train/test data
- Use raw, unpreprocessed data

### Hyperparameter Guidelines

**Start with defaults**, then experiment:

**Image Classification**:
```python
learning_rate = 0.001
batch_size = 32
epochs = 50
optimizer = "Adam"
augmentation = True
pretrained = True
```

**Tabular Data (Scikit-learn)**:
```python
# Random Forest
n_estimators = 100
max_depth = 10
min_samples_split = 5

# XGBoost
learning_rate = 0.1
max_depth = 6
n_estimators = 100
```

### Monitoring Tips

Watch for these patterns:

**Overfitting**:
- Training loss ↓, validation loss ↑
- **Solution**: More data, augmentation, regularization

**Underfitting**:
- Both losses high and not improving
- **Solution**: larger model, more epochs, higher learning rate

**Good Training**:
- Both losses decreasing together
- Validation slightly higher than training
- Metrics improving steadily

### Cost Optimization

**Save Money**:
- Use CPU for small models/datasets
- Stop training early if converged
- Monitor GPU utilization (should be >80%)
- Delete unused models
- Use spot instances (if available)

## Troubleshooting

### Training Won't Start

**Check**:
- Dataset is "Ready" status
- Sufficient credits/quota
- All required fields filled
- Browser doesn't block popup

### Training Crashes

**Common Causes**:
- Out of memory (reduce batch size)
- Bad hyperparameters (extreme values)
- Corrupted data
- Framework errors

**Solutions**:
1. Try smaller batch size
2. Use CPU to test configuration
3. Review logs for error messages
4. Contact support with job ID

### Poor Performance

**If accuracy is low**:
1. Train longer (more epochs)
2. Try different architecture
3. Add data augmentation
4. Use pretrained weights
5. Check data quality
6. Balance class distribution

### Slow Training

**Speed up training**:
1. Enable GPU if not already
2. Increase batch size (if memory allows)
3. Use mixed precision training
4. Reduce model complexity
5. Use data augmentation carefully

## Advanced Features

### Custom Architectures

Define your own model:

```python
# PyTorch Custom Model
class CustomCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 64, 3)
        self.conv2 = nn.Conv2d(64, 128, 3)
        self.fc = nn.Linear(128, 10)
    
    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = F.relu(self.conv2(x))
        x = self.fc(x)
        return x

# Upload via API
client.models.create_custom(
    code=model_code,
    config=training_config
)
```

### Hyperparameter Tuning

Automated search:

```bash
forge train --dataset my-dataset \
  --tune-hyperparameters \
  --trials 20 \
  --metric accuracy
```

### Distributed Training

For large models:

```bash
forge train --dataset large-dataset \
  --distributed \
  --num-gpus 4 \
  --strategy ddp
```

## Next Steps

After training your model:

1. **Evaluate**: Test on holdout set
2. **Deploy**: Create serving endpoint
3. **Monitor**: Track inference performance
4. **Iterate**: Improve with more data/tuning

## Resources

- [Dataset Upload Guide](./dataset-upload.md)
- [Getting Started](./getting-started.md)
- [Development Workflows](./workflows.md)
- [API Documentation](../api/README.md)

---

**Questions?** Contact support@forgedev.com or check our documentation!
