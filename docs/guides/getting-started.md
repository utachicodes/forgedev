# Getting Started with ForgeDev

Welcome to ForgeDev! This guide will help you get started with the unified development platform.

## Overview

ForgeDev consolidates AI/ML training, web development, DevOps automation, and testing into one powerful platform. This guide covers the basics of accessing and using the platform.

## Prerequisites

Before you begin, ensure you have:
- An approved ForgeDev account (see [Requesting Access](#requesting-access))
- Modern web browser (Chrome, Firefox, or Safari)
- Basic understanding of software development concepts

## Requesting Access

ForgeDev is an enterprise platform with manual account creation.

1. **Visit the homepage**: Go to [forgedev.com](https://forgedev.com)
2. **Navigate to Request Access**: Click "Request Access" or scroll to the access request form
3. **Fill out the form**:
   - Email address (required)
   - Company name (required)
   - Team size
   - Primary use case (required)
4. **Submit your request**
5. **Wait for approval**: You'll receive login credentials via email within 1-2 business days

### Subscription Details
- **Price**: 10,000 FCFA/month
- **Includes**: All platform features, unlimited users, 24/7 support
- **Billing**: Enterprise invoicing

## First Login

Once you receive your credentials:

1. **Navigate to login**: Visit [forgedev.com/auth/login](https://forgedev.com/auth/login)
2. **Enter credentials**:
   - Email address (provided in approval email)
   - Password (provided in approval email)
3. **Change password**: You'll be prompted to set a new password on first login
4. **Explore the platform**: You'll see the main dashboard

## Platform Navigation

### Main Sections

ForgeDev is organized into several key areas:

#### 🤖 AI Training
Access AI/ML training tools:
- **Datasets**: Upload and manage training data
- **Train**: Configure and start training jobs
- **Monitor**: Watch training progress in real-time
- **Models**: Browse and manage trained models

#### 💻 Workspaces
Your development environment:
- Code editor
- File management
- Git integration
- Terminal access

#### 🚀 DevOps
Infrastructure and deployment:
- CI/CD pipelines
- Infrastructure management
- Deployment automation
- Monitoring and logs

#### 🧪 Testing
Testing suite:
- Unit tests
- Integration tests
- E2E tests
- Coverage reports

## Your First Project

### 1. Create a Workspace

```bash
# From the workspaces section
Click "New Workspace"
Enter workspace name: "my-first-project"
Select template: "Next.js + AI"
Click "Create"
```

### 2. Upload a Dataset

For AI/ML projects:

1. Navigate to **AI Training → Datasets**
2. Click **"Upload New Dataset"**
3. Drag and drop your data files (images, CSV, JSON, etc.)
4. Enter dataset metadata:
   - Name: "My Training Data"
   - Type: "Image Classification" (or your type)
   - Description: Brief description
5. Click **"Upload Dataset"**

See the [Dataset Upload Guide](./dataset-upload.md) for detailed instructions.

### 3. Configure Training

1. Navigate to **AI Training → Train**
2. Select framework: PyTorch, TensorFlow, or Scikit-learn
3. Choose your dataset
4. Configure hyperparameters:
   - Learning rate
   - Batch size
   - Epochs
5. Select hardware (GPU/CPU)
6. Review and start training

See the [Model Training Guide](./model-training.md) for detailed instructions.

### 4. Monitor Progress

1. Navigate to **AI Training → Monitor**
2. Select your running training job
3. View:
   - Real-time loss and accuracy charts
   - Training logs
   - Current metrics
   - GPU/CPU utilization

## Common Tasks

### Checking Platform Status

All services show their status in the dashboard:
- 🟢 Green: Service running normally
- 🟡 Yellow: Service degraded
- 🔴 Red: Service down

### Getting Help

**Documentation**: Visit the [docs](../README.md) for comprehensive guides

**Support**:
- Email: support@forgedev.com
- 24/7 enterprise support included
- Response time: < 4 hours

### Managing Team Members

Account administrators can:
1. Navigate to **Settings → Team**
2. Click **"Invite Member"**
3. Enter email and role
4. Member receives invitation email

## Best Practices

### 🔒 Security
- Use strong passwords
- Enable 2FA when available
- Don't share credentials
- Review audit logs regularly

### 💾 Data Management
- Organize datasets with clear names
- Add descriptions to all datasets
- Version your models
- Regular backups

### 🚀 Performance
- Use GPU for deep learning
- Optimize batch sizes
- Monitor resource usage
- Clean up unused resources

## Next Steps

Now that you're familiar with the basics:

1. **Explore AI Training**: [Model Training Guide](./model-training.md)
2. **Set Up CI/CD**: [Development Workflows](./workflows.md)
3. **Deploy Your App**: Contact support for deployment guidance

## Troubleshooting

### Can't log in?
- Verify email and password
- Check for typos
- Try password reset
- Contact support if issues persist

### Upload failing?
- Check file format (supported: images, CSV, JSON, video, ZIP)
- Verify file size (max 5GB per file)
- Ensure stable internet connection
- Try smaller batches

### Training not starting?
- Verify dataset is uploaded
- Check all required fields are filled
- Ensure sufficient credits/quota
- Review training configuration

## Feedback

We value your feedback! Contact us at:
- **Email**: feedback@forgedev.com
- **Feature requests**: Include in support tickets

---

**Ready to build?** Head to the [Model Training Guide](./model-training.md) to start your first AI training job!
