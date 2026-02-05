"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Brain,
    Database,
    Settings,
    Zap,
    CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface TrainingConfig {
    // Step 1
    framework: string;
    architecture: string;
    modelType: string;
    pretrained: boolean;

    // Step 2
    datasetId: string;

    // Step 3
    learningRate: number;
    batchSize: number;
    epochs: number;
    optimizer: string;
    lossFunction: string;

    // Step 4
    gpuEnabled: boolean;
    earlyStoppingEnabled: boolean;
    checkpointFrequency: number;
    augmentation: boolean;
}

const FRAMEWORKS = [
    {
        id: "PYTORCH",
        name: "PyTorch",
        icon: "🔥",
        architectures: ["resnet18", "resnet50", "mobilenetv2", "vgg16", "custom"],
    },
    {
        id: "TENSORFLOW",
        name: "TensorFlow",
        icon: "📊",
        architectures: ["resnet50", "mobilenetv2", "vgg16", "efficientnet", "custom"],
    },
    {
        id: "SCIKIT_LEARN",
        name: "Scikit-learn",
        icon: "🔬",
        architectures: ["randomforest", "gradientboosting", "svm", "logisticregression"],
    },
];

const MODEL_TYPES = [
    { id: "CLASSIFICATION", name: "Classification", desc: "Categorize inputs into classes" },
    { id: "DETECTION", name: "Object Detection", desc: "Locate and classify objects" },
    { id: "SEGMENTATION", name: "Segmentation", desc: "Pixel-level classification" },
    { id: "REGRESSION", name: "Regression", desc: "Predict continuous values" },
];

export default function TrainPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState<TrainingConfig>({
        framework: searchParams.get("framework") || "PYTORCH",
        architecture: "resnet50",
        modelType: "CLASSIFICATION",
        pretrained: true,
        datasetId: "",
        learningRate: 0.001,
        batchSize: 32,
        epochs: 10,
        optimizer: "adam",
        lossFunction: "cross_entropy",
        gpuEnabled: false,
        earlyStoppingEnabled: true,
        checkpointFrequency: 5,
        augmentation: true,
    });

    const [datasets, setDatasets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch available datasets
        fetchDatasets();
    }, []);

    const fetchDatasets = async () => {
        // Mock data for now
        setDatasets([
            { id: "1", name: "CIFAR-10 Images", numSamples: 60000, type: "IMAGE" },
            { id: "2", name: "Customer Reviews", numSamples: 50000, type: "TEXT" },
            { id: "3", name: "Sales Data 2024", numSamples: 12500, type: "TABULAR" },
        ]);
    };

    const updateConfig = (updates: Partial<TrainingConfig>) => {
        setConfig((prev) => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        if (step < 5) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const startTraining = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/training/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model_name: `${config.framework}_${config.architecture}_${Date.now()}`,
                    dataset_id: config.datasetId,
                    project_id: "default-project",
                    framework: config.framework,
                    model_type: config.modelType,
                    architecture: config.architecture,
                    learning_rate: config.learningRate,
                    batch_size: config.batchSize,
                    epochs: config.epochs,
                    optimizer: config.optimizer,
                    loss_function: config.lossFunction,
                    gpu_enabled: config.gpuEnabled,
                    early_stopping: config.earlyStoppingEnabled,
                    checkpoint_frequency: config.checkpointFrequency,
                    augmentation: config.augmentation,
                    pretrained: config.pretrained,
                }),
            });

            const data = await response.json();

            if (data.job_id) {
                router.push(`/ai-training/monitor/${data.job_id}`);
            }
        } catch (error) {
            console.error("Failed to start training:", error);
            alert("Failed to start training. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const selectedFramework = FRAMEWORKS.find((f) => f.id === config.framework);

    return (
        <div className="min-h-screen bg-[#030508] text-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/ai-training"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to AI Training
                    </Link>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent mb-2">
                        Configure Training
                    </h1>
                    <p className="text-zinc-400">
                        Set up your AI model training parameters
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="glass-card p-6 mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div key={s} className="flex items-center flex-1">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${s < step
                                            ? "bg-green-500 text-white"
                                            : s === step
                                                ? "bg-blue-500 text-white"
                                                : "bg-zinc-800 text-zinc-500"
                                        }`}
                                >
                                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                                </div>
                                {s < 5 && (
                                    <div
                                        className={`flex-1 h-1 mx-2 transition-all ${s < step ? "bg-green-500" : "bg-zinc-800"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-3 text-sm text-zinc-400">
                        <span className={step === 1 ? "text-white font-medium" : ""}>Framework</span>
                        <span className={step === 2 ? "text-white font-medium" : ""}>Dataset</span>
                        <span className={step === 3 ? "text-white font-medium" : ""}>Hyperparameters</span>
                        <span className={step === 4 ? "text-white font-medium" : ""}>Hardware</span>
                        <span className={step === 5 ? "text-white font-medium" : ""}>Review</span>
                    </div>
                </div>

                {/* Step Content */}
                <div className="glass-card p-8 mb-6">
                    {/* Step 1: Framework & Model */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                    <Brain className="w-6 h-6 text-blue-400" />
                                    Select Framework & Model
                                </h2>
                                <p className="text-zinc-400 text-sm">
                                    Choose the ML framework and model architecture
                                </p>
                            </div>

                            {/* Framework Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Framework</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {FRAMEWORKS.map((fw) => (
                                        <button
                                            key={fw.id}
                                            onClick={() => updateConfig({ framework: fw.id, architecture: fw.architectures[0] })}
                                            className={`p-4 rounded-lg border-2 transition-all ${config.framework === fw.id
                                                    ? "border-blue-500 bg-blue-500/10"
                                                    : "border-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <div className="text-3xl mb-2">{fw.icon}</div>
                                            <div className="font-medium">{fw.name}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Architecture Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Architecture</label>
                                <select
                                    value={config.architecture}
                                    onChange={(e) => updateConfig({ architecture: e.target.value })}
                                    className="w-full bg-[#13161c] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                >
                                    {selectedFramework?.architectures.map((arch) => (
                                        <option key={arch} value={arch}>
                                            {arch.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Model Type */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Model Type</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {MODEL_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => updateConfig({ modelType: type.id })}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${config.modelType === type.id
                                                    ? "border-blue-500 bg-blue-500/10"
                                                    : "border-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <div className="font-medium mb-1">{type.name}</div>
                                            <div className="text-sm text-zinc-400">{type.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pre-trained Toggle */}
                            <div className="flex items-center justify-between p-4 bg-[#13161c] rounded-lg">
                                <div>
                                    <div className="font-medium">Use Pre-trained Weights</div>
                                    <div className="text-sm text-zinc-400">Start with ImageNet weights</div>
                                </div>
                                <button
                                    onClick={() => updateConfig({ pretrained: !config.pretrained })}
                                    className={`relative w-14 h-8 rounded-full transition-colors ${config.pretrained ? "bg-blue-500" : "bg-zinc-700"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${config.pretrained ? "translate-x-7" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Dataset Selection */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                    <Database className="w-6 h-6 text-green-400" />
                                    Select Dataset
                                </h2>
                                <p className="text-zinc-400 text-sm">
                                    Choose a dataset for training
                                </p>
                            </div>

                            <div className="space-y-3">
                                {datasets.map((dataset) => (
                                    <button
                                        key={dataset.id}
                                        onClick={() => updateConfig({ datasetId: dataset.id })}
                                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${config.datasetId === dataset.id
                                                ? "border-blue-500 bg-blue-500/10"
                                                : "border-white/10 hover:border-white/20"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">{dataset.name}</div>
                                                <div className="text-sm text-zinc-400">
                                                    {dataset.numSamples.toLocaleString()} samples · {dataset.type}
                                                </div>
                                            </div>
                                            {config.datasetId === dataset.id && (
                                                <CheckCircle className="w-5 h-5 text-blue-400" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <Link
                                href="/ai-training/datasets/upload"
                                className="block w-full p-4 border-2 border-dashed border-white/10 rounded-lg text-center text-zinc-400 hover:border-white/20 hover:text-white transition-all"
                            >
                                + Upload New Dataset
                            </Link>
                        </div>
                    )}

                    {/* Step 3: Hyperparameters */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                    <Settings className="w-6 h-6 text-purple-400" />
                                    Hyperparameters
                                </h2>
                                <p className="text-zinc-400 text-sm">
                                    Configure training parameters
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Learning Rate</label>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        value={config.learningRate}
                                        onChange={(e) => updateConfig({ learningRate: parseFloat(e.target.value) })}
                                        className="w-full bg-[#13161c] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Batch Size</label>
                                    <select
                                        value={config.batchSize}
                                        onChange={(e) => updateConfig({ batchSize: parseInt(e.target.value) })}
                                        className="w-full bg-[#13161c] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        {[8, 16, 32, 64, 128].map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Epochs</label>
                                    <input
                                        type="number"
                                        value={config.epochs}
                                        onChange={(e) => updateConfig({ epochs: parseInt(e.target.value) })}
                                        className="w-full bg-[#13161c] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Optimizer</label>
                                    <select
                                        value={config.optimizer}
                                        onChange={(e) => updateConfig({ optimizer: e.target.value })}
                                        className="w-full bg-[#13161c] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="adam">Adam</option>
                                        <option value="sgd">SGD</option>
                                        <option value="adamw">AdamW</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Checkpoint Every (epochs)</label>
                                    <input
                                        type="number"
                                        value={config.checkpointFrequency}
                                        onChange={(e) => updateConfig({ checkpointFrequency: parseInt(e.target.value) })}
                                        className="w-full bg-[#13161c] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-[#13161c] rounded-lg">
                                    <div>
                                        <div className="font-medium">Early Stopping</div>
                                        <div className="text-sm text-zinc-400">Stop when validation loss plateaus</div>
                                    </div>
                                    <button
                                        onClick={() => updateConfig({ earlyStoppingEnabled: !config.earlyStoppingEnabled })}
                                        className={`relative w-14 h-8 rounded-full transition-colors ${config.earlyStoppingEnabled ? "bg-blue-500" : "bg-zinc-700"
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${config.earlyStoppingEnabled ? "translate-x-7" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-[#13161c] rounded-lg">
                                    <div>
                                        <div className="font-medium">Data Augmentation</div>
                                        <div className="text-sm text-zinc-400">Apply random transformations</div>
                                    </div>
                                    <button
                                        onClick={() => updateConfig({ augmentation: !config.augmentation })}
                                        className={`relative w-14 h-8 rounded-full transition-colors ${config.augmentation ? "bg-blue-500" : "bg-zinc-700"
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${config.augmentation ? "translate-x-7" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Hardware */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-amber-400" />
                                    Hardware Configuration
                                </h2>
                                <p className="text-zinc-400 text-sm">
                                    Choose compute resources
                                </p>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-[#13161c] rounded-lg">
                                <div>
                                    <div className="font-medium text-lg">GPU Acceleration</div>
                                    <div className="text-sm text-zinc-400 mt-1">
                                        Use GPU for faster training (if available)
                                    </div>
                                </div>
                                <button
                                    onClick={() => updateConfig({ gpuEnabled: !config.gpuEnabled })}
                                    className={`relative w-16 h-9 rounded-full transition-colors ${config.gpuEnabled ? "bg-green-500" : "bg-zinc-700"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 w-7 h-7 bg-white rounded-full transition-transform ${config.gpuEnabled ? "translate-x-8" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>

                            {config.gpuEnabled && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <p className="text-sm text-green-400">
                                        ⚡ GPU acceleration will significantly speed up training
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 5: Review */}
                    {step === 5 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Review Configuration</h2>
                                <p className="text-zinc-400 text-sm">
                                    Verify your settings before starting training
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-[#13161c] rounded-lg">
                                    <div className="text-sm text-zinc-400 mb-1">Framework</div>
                                    <div className="font-medium">{selectedFramework?.name} - {config.architecture.toUpperCase()}</div>
                                </div>

                                <div className="p-4 bg-[#13161c] rounded-lg">
                                    <div className="text-sm text-zinc-400 mb-1">Dataset</div>
                                    <div className="font-medium">
                                        {datasets.find((d) => d.id === config.datasetId)?.name || "No dataset selected"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-[#13161c] rounded-lg">
                                        <div className="text-sm text-zinc-400 mb-1">Learning Rate</div>
                                        <div className="font-medium">{config.learningRate}</div>
                                    </div>
                                    <div className="p-4 bg-[#13161c] rounded-lg">
                                        <div className="text-sm text-zinc-400 mb-1">Batch Size</div>
                                        <div className="font-medium">{config.batchSize}</div>
                                    </div>
                                    <div className="p-4 bg-[#13161c] rounded-lg">
                                        <div className="text-sm text-zinc-400 mb-1">Epochs</div>
                                        <div className="font-medium">{config.epochs}</div>
                                    </div>
                                    <div className="p-4 bg-[#13161c] rounded-lg">
                                        <div className="text-sm text-zinc-400 mb-1">Optimizer</div>
                                        <div className="font-medium">{config.optimizer.toUpperCase()}</div>
                                    </div>
                                </div>

                                <div className="p-4 bg-[#13161c] rounded-lg">
                                    <div className="text-sm text-zinc-400 mb-2">Options</div>
                                    <div className="flex flex-wrap gap-2">
                                        {config.pretrained && (
                                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                                                Pre-trained
                                            </span>
                                        )}
                                        {config.gpuEnabled && (
                                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                                GPU Enabled
                                            </span>
                                        )}
                                        {config.earlyStoppingEnabled && (
                                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                                                Early Stopping
                                            </span>
                                        )}
                                        {config.augmentation && (
                                            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">
                                                Augmentation
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className="px-6 py-3 bg-zinc-800 text-white rounded-lg font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </button>

                    {step < 5 ? (
                        <button
                            onClick={nextStep}
                            disabled={step === 2 && !config.datasetId}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={startTraining}
                            disabled={loading || !config.datasetId}
                            className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Starting...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    Start Training
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
