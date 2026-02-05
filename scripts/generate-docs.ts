import Groq from 'groq-sdk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || '',
});

interface DocConfig {
    inputPath: string;
    outputPath: string;
    docType: 'api' | 'component' | 'guide';
    title: string;
}

async function generateDocumentation(
    fileContent: string,
    docType: 'api' | 'component' | 'guide',
    title: string
): Promise<string> {
    const prompts = {
        api: `Analyze this API code and generate comprehensive Markdown documentation:

${fileContent}

Include:
# ${title}

## Overview
[Brief description of the API]

## Endpoints

### Endpoint Name
- **Method**: GET/POST/etc
- **URL**: \`/api/path\`
- **Description**: What this endpoint does

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|

**Response:**
\`\`\`json
{
  "example": "response"
}
\`\`\`

**Example Usage:**
\`\`\`bash
curl -X GET https://api.forgedev.com/...
\`\`\`

## Error Handling
Common error codes and their meanings.`,

        component: `Analyze this React component and generate Markdown documentation:

${fileContent}

Include:
# ${title}

## Overview
Brief description of what this component does.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|

## Usage Example

\`\`\`tsx
import { ComponentName } from './path';

function MyComponent() {
  return (
    <ComponentName 
      prop1="value"
      prop2={true}
    />
  );
}
\`\`\`

## Features
- Feature 1
- Feature 2

## Best Practices
- Best practice 1
- Best practice 2`,

        guide: `Create a comprehensive user guide based on this code:

${fileContent}

Write in Markdown format:
# ${title}

## Introduction
What this guide covers and who it's for.

## Prerequisites
- What users need before starting

## Step-by-Step Instructions

### Step 1: [Action]
Detailed instructions...

### Step 2: [Action]  
Detailed instructions...

## Common Issues

### Issue: [Problem]
**Solution**: How to fix it

## Best Practices
- Practice 1
- Practice 2

## Next Steps
What to do after completing this guide.`
    };

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'You are a technical documentation expert. Generate clear, comprehensive, and well-structured documentation in Markdown format.'
            },
            {
                role: 'user',
                content: prompts[docType],
            },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        max_tokens: 3000,
    });

    return response.choices[0]?.message?.content || '';
}

async function processFile(config: DocConfig): Promise<void> {
    try {
        console.log(`\n📄 Processing: ${config.title}`);

        // Read source file
        const filePath = path.join(__dirname, '..', config.inputPath);
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // Generate documentation
        console.log('🤖 Generating documentation with AI...');
        const documentation = await generateDocumentation(
            fileContent,
            config.docType,
            config.title
        );

        // Ensure output directory exists
        const outputPath = path.join(__dirname, '..', config.outputPath);
        const outputDir = path.dirname(outputPath);
        await fs.mkdir(outputDir, { recursive: true });

        // Write documentation
        await fs.writeFile(outputPath, documentation, 'utf-8');
        console.log(`✅ Documentation saved to: ${config.outputPath}`);
    } catch (error) {
        console.error(`❌ Error processing ${config.title}:`, error);
    }
}

async function main() {
    console.log('🚀 ForgeDev Documentation Generator\n');
    console.log('Using Groq API to generate AI-powered documentation...\n');

    if (!process.env.GROQ_API_KEY) {
        console.error('❌ Error: GROQ_API_KEY environment variable is not set');
        console.error('Please set it in your .env file or export it:');
        console.error('export GROQ_API_KEY=your_api_key_here');
        process.exit(1);
    }

    const configs: DocConfig[] = [
        // Component Documentation
        {
            inputPath: 'apps/web/components/DatasetUploader.tsx',
            outputPath: 'docs/components/dataset-uploader.md',
            docType: 'component',
            title: 'DatasetUploader Component'
        },
        {
            inputPath: 'apps/web/app/ai-training/train/page.tsx',
            outputPath: 'docs/components/training-wizard.md',
            docType: 'component',
            title: 'Training Configuration Wizard'
        },
        {
            inputPath: 'apps/web/app/ai-training/models/page.tsx',
            outputPath: 'docs/components/model-gallery.md',
            docType: 'component',
            title: 'Model Gallery'
        },

        // User Guides
        {
            inputPath: 'apps/web/components/DatasetUploader.tsx',
            outputPath: 'docs/guides/dataset-upload.md',
            docType: 'guide',
            title: 'Dataset Upload Guide'
        },
        {
            inputPath: 'apps/web/app/ai-training/train/page.tsx',
            outputPath: 'docs/guides/model-training.md',
            docType: 'guide',
            title: 'Model Training Guide'
        },
    ];

    // Process all configs
    for (const config of configs) {
        await processFile(config);
        // Wait a bit between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n✨ Documentation generation complete!\n');
    console.log('Generated documentation:');
    console.log('  - docs/components/dataset-uploader.md');
    console.log('  - docs/components/training-wizard.md');
    console.log('  - docs/components/model-gallery.md');
    console.log('  - docs/guides/dataset-upload.md');
    console.log('  - docs/guides/model-training.md');
    console.log('\nNext steps:');
    console.log('  1. Review the generated documentation for accuracy');
    console.log('  2. Add screenshots and examples as needed');
    console.log('  3. Update the main docs/README.md with links');
}

main().catch(console.error);
