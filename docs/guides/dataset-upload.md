# Dataset Upload Guide

Learn how to upload and manage datasets for AI/ML training in ForgeDev.

## Overview

The ForgeDev platform supports various dataset types for training machine learning models. This guide covers everything you need to know about uploading, organizing, and managing your training data.

## Supported Dataset Types

### Image Datasets
- **Formats**: JPG, JPEG, PNG, WebP, TIFF
- **Use Cases**: Image classification, object detection, segmentation
- **Max File Size**: 50MB per image
- **Recommended Structure**: Organized in folders by class

### Tabular Data
- **Formats**: CSV, TSV, Excel (XLSX)
- **Use Cases**: Regression, classification, time series
- **Max File Size**: 500MB per file
- **Requirements**: Header row with column names

### JSON Data
- **Formats**: JSON, JSONL (JSON Lines)
- **Use Cases**: NLP, structured data, annotations
- **Max File Size**: 100MB per file
- **Structure**: Array of objects or line-delimited JSON

### Video Data
- **Formats**: MP4, AVI, MOV
- **Use Cases**: Video classification, action recognition
- **Max File Size**: 2GB per video
- **Recommended**: 1080p or lower resolution

### Archives
- **Formats**: ZIP, TAR.GZ
- **Max Size**: 5GB
- **Contents**: Can contain any supported format
- **Auto-extraction**: Archives are automatically extracted

## Step-by-Step Upload Process

### Step 1: Navigate to Datasets

1. Log in to ForgeDev
2. Click **"AI Training"** in the sidebar
3. Select **"Datasets"** from the submenu
4. Click **"Upload New Dataset"** button

### Step 2: Prepare Your Data

**For Image Classification**:
```
dataset/
├── class1/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
├── class2/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
└── class3/
    ├── image1.jpg
    └── ...
```

**For Tabular Data**:
```csv
feature1,feature2,feature3,label
1.2,3.4,5.6,category_a
2.3,4.5,6.7,category_b
...
```

**For Object Detection**:
```
dataset/
├── images/
│   ├── img1.jpg
│   ├── img2.jpg
│   └── ...
└── annotations.json  # COCO format
```

### Step 3: Upload Files

#### Drag and Drop

1. Drag your files or folder from your file explorer
2. Drop them into the upload area
3. Wait for upload progress to complete

#### Click to Browse

1. Click the upload area
2. Navigate to your files in the file picker
3. Select one or more files
4. Click "Open"

### Step 4: Configure Dataset Metadata

Fill in the required information:

**Dataset Name** (required):
- Enter a descriptive name
- Example: "CIFAR-10 Animals", "Customer Churn Data"
- Use clear, searchable names

**Dataset Type** (required):
Select from:
- Image Classification
- Object Detection
- Tabular Data
- Text Data
- Video Data
- Custom

**Description** (optional but recommended):
- Describe the dataset contents
- Note any preprocessing applied
- Include data source attribution
- Mention class distribution

**Example**:
```
Name: ImageNet Cats vs Dogs
Type: Image Classification
Description: 10,000 images of cats and dogs, 
balanced at 5,000 each. Images resized to 224x224.
Source: Kaggle Dogs vs Cats dataset.
```

### Step 5: Monitor Upload Progress

Watch the progress indicators:
- **Individual files**: Each file shows its own progress bar
- **Overall progress**: Total upload percentage
- **Upload speed**: Current transfer rate
- **Time remaining**: Estimated completion time

**Status Icons**:
- ⏳ Uploading
- ✅ Complete
- ❌ Failed

### Step 6: Verify Upload

After upload completes:

1. Dataset appears in your datasets list
2. Check the dataset card for:
   - File count
   - Total size
   - Upload date
   - Status (Ready/Processing)

## Managing Datasets

### Search and Filter

**Search by Name**:
1. Use the search bar at the top
2. Type dataset name
3. Results filter in real-time

**Filter by Type**:
1. Click the "Type" dropdown
2. Select dataset type
3. View filtered results

### Dataset Actions

**View Details**:
- Click on a dataset card
- See full metadata
- View sample files
- Check usage statistics

**Download**:
- Click "Download" on dataset card
- Entire dataset downloads as ZIP
- Preserves folder structure

**Delete**:
- Click "Delete" on dataset card
- Confirm deletion
- **Warning**: This is permanent!

## Best Practices

### Data Organization

✅ **DO**:
- Use consistent naming conventions
- Organize files in clear folder structures
- Include README files in archives
- Version your datasets (e.g., dataset_v1, dataset_v2)

❌ **DON'T**:
- Mix unrelated data in one dataset
- Use special characters in filenames
- Upload without metadata
- Forget to verify data quality

### Data Quality

**Before Upload**:
- Remove corrupted files
- Check image dimensions
- Verify CSV headers
- Validate JSON structure
- Balance class distributions (if applicable)

**Image Data**:
- Consistent resolution recommended
- Remove duplicates
- Check for corrupted images
- Verify annotations

**Tabular Data**:
- Handle missing values
- Encode categorical variables appropriately
- Normalize numerical features (optional)
- Remove outliers (if appropriate)

### Security & Privacy

**Sensitive Data**:
- Remove personal/identifying information
- Check for embedded metadata in images (EXIF)
- Ensure you have rights to use the data
- Follow gdpr/privacy regulations

**Access Control**:
- Datasets are private to your organization by default
- Configure sharing settings as needed
- Audit dataset access logs

## Troubleshooting

### Upload Fails

**Problem**: Upload stops or fails midway

**Solutions**:
1. Check internet connection stability
2. Try smaller batches
3. Reduce file sizes
4. Use archive format for many small files
5. Check browser console for errors

**Problem**: "File format not supported" error

**Solutions**:
1. Verify file extension
2. Check file isn't corrupted
3. Convert to supported format
4. Use ZIP if format is unusual

### Upload is Slow

**Solutions**:
1. compress images before upload
2. Use faster internet connection
3. Upload during off-peak hours
4. Batch similar files together
5. Use archive format

### Dataset Not Appearing

**Problem**: Dataset uploaded but not visible

**Solutions**:
1. Refresh the page
2. Check "Processing" status
3. Wait for extraction (if ZIP)
4. Check for upload errors in notifications
5. Contact support if persists

## Dataset Limits

### File Limits
- **Single file**: 5GB maximum
- **Total dataset**: 50GB maximum (contact sales for more)
- **File count**: 1 million files per dataset

### Storage Quota
- Check your current usage in Settings → Storage
- Upgrade plan for more storage
- Delete unused datasets to free space

## Advanced Features

### Dataset Versioning

Create new versions to track changes:

```bash
# Via CLI
forge dataset create --name "my-dataset-v2" \
  --parent "my-dataset-v1" \
  --files ./new_data/
```

### Automated Upload

Upload via API or CLI:

```python
from forge import Client

client = Client(api_key="your_api_key")

dataset = client.datasets.create(
    name="Automated Upload",
    type="image_classification",
    files_path="./dataset/",
    description="Uploaded via API"
)

print(f"Dataset ID: {dataset.id}")
```

### Data Augmentation

Configure augmentation during upload:

```python
dataset = client.datasets.create(
    name="Augmented Dataset",
    type="image_classification",
    files_path="./images/",
    augmentation={
        "rotation": 15,
        "flip_horizontal": True,
        "brightness": 0.2
    }
)
```

## Next Steps

After uploading your dataset:

1. **Train a Model**: Use your dataset in the [Training Wizard](./model-training.md)
2. **Explore Data**: View samples and statistics
3. **Share with Team**: Configure access permissions
4. **Version Control**: Create new versions as data evolves

## Need Help?

- **Documentation**: [Component Reference](../components/dataset-uploader.md)
- **Support**: support@forgedev.com
- **Community**: Join our Slack channel

---

**Ready to train?** Head to the [Model Training Guide](./model-training.md) to start using your dataset!
