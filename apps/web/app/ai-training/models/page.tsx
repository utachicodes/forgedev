"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Brain,
    Search,
    Filter,
    TrendingUp,
    Download,
    Eye,
    Trash2,
    Star,
    Clock,
    Zap,
    BarChart3,
} from "lucide-react";

interface Model {
    id: string;
    name: string;
    framework: string;
    architecture: string;
    accuracy: number;
    status: "ACTIVE" | "ARCHIVED";
    sizeBytes: number;
    createdAt: string;
    trainingJobId: string;
    metrics: {
        trainLoss: number;
        valLoss: number;
        trainAcc: number;
        valAcc: number;
    };
}

export default function ModelsPage() {
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterFramework, setFilterFramework] = useState<string>("all");

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        try {
            // In production, fetch from API
            // Mock data for demonstration
            setModels([
                {
                    id: "1",
                    name: "ResNet50 - CIFAR10 v1",
                    framework: "PYTORCH",
                    architecture: "resnet50",
                    accuracy: 0.924,
                    status: "ACTIVE",
                    sizeBytes: 102400000,
                    createdAt: new Date().toISOString(),
                    trainingJobId: "job-123",
                    metrics: {
                        trainLoss: 0.245,
                        valLoss: 0.312,
                        trainAcc: 0.924,
                        valAcc: 0.891,
                    },
                },
                {
                    id: "2",
                    name: "MobileNetV2 - Custom Dataset",
                    framework: "TENSORFLOW",
                    architecture: "mobilenetv2",
                    accuracy: 0.887,
                    status: "ACTIVE",
                    sizeBytes: 14200000,
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    trainingJobId: "job-124",
                    metrics: {
                        trainLoss: 0.352,
                        valLoss: 0.421,
                        trainAcc: 0.887,
                        valAcc: 0.856,
                    },
                },
                {
                    id: "3",
                    name: "Random Forest Classifier",
                    framework: "SCIKIT_LEARN",
                    architecture: "randomforest",
                    accuracy: 0.912,
                    status: "ACTIVE",
                    sizeBytes: 5600000,
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    trainingJobId: "job-125",
                    metrics: {
                        trainLoss: 0.198,
                        valLoss: 0.289,
                        trainAcc: 0.912,
                        valAcc: 0.883,
                    },
                },
            ]);
        } catch (error) {
            console.error("Failed to fetch models:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const getFrameworkBadge = (framework: string) => {
        const configs = {
            PYTORCH: { color: "bg-orange-500/10 text-orange-400 border-orange-500/20", label: "PyTorch" },
            TENSORFLOW: { color: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "TensorFlow" },
            SCIKIT_LEARN: { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Scikit-learn" },
        };
        const config = configs[framework as keyof typeof configs] || configs.PYTORCH;
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium border ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const filteredModels = models.filter((model) => {
        const matchesSearch =
            model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.architecture.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFramework = filterFramework === "all" || model.framework === filterFramework;
        return matchesSearch && matchesFramework;
    });

    const deleteModel = async (id: string) => {
        if (!confirm("Are you sure you want to delete this model?")) return;
        setModels((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#030508] text-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent mb-2">
                            Model Gallery
                        </h1>
                        <p className="text-zinc-400">Browse and manage your trained models</p>
                    </div>
                    <Link
                        href="/ai-training/train"
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                        <Zap className="w-5 h-5" />
                        Train New Model
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Total Models</p>
                                <p className="text-2xl font-bold text-white">{models.length}</p>
                            </div>
                            <Brain className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Avg Accuracy</p>
                                <p className="text-2xl font-bold text-white">
                                    {models.length > 0
                                        ? `${(
                                            (models.reduce((sum, m) => sum + m.accuracy, 0) / models.length) *
                                            100
                                        ).toFixed(1)}%`
                                        : "N/A"}
                                </p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-400" />
                        </div>
                    </div>
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Storage Used</p>
                                <p className="text-2xl font-bold text-white">
                                    {formatFileSize(models.reduce((sum, m) => sum + m.sizeBytes, 0))}
                                </p>
                            </div>
                            <Download className="w-8 h-8 text-purple-400" />
                        </div>
                    </div>
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Active Models</p>
                                <p className="text-2xl font-bold text-white">
                                    {models.filter((m) => m.status === "ACTIVE").length}
                                </p>
                            </div>
                            <Star className="w-8 h-8 text-amber-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="glass-card p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search models..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#13161c] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <select
                            value={filterFramework}
                            onChange={(e) => setFilterFramework(e.target.value)}
                            className="bg-[#13161c] border border-white/10 rounded-lg pl-10 pr-10 py-2 text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="all">All Frameworks</option>
                            <option value="PYTORCH">PyTorch</option>
                            <option value="TENSORFLOW">TensorFlow</option>
                            <option value="SCIKIT_LEARN">Scikit-learn</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Models Grid */}
            {loading ? (
                <div className="glass-card p-12 text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-zinc-400">Loading models...</p>
                </div>
            ) : filteredModels.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <Brain className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-400 mb-2">No models found</p>
                    <p className="text-sm text-zinc-500">Train your first model to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredModels.map((model) => (
                        <div
                            key={model.id}
                            className="glass-card p-6 hover:bg-[#13161c]/60 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors mb-1 truncate">
                                        {model.name}
                                    </h3>
                                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(model.createdAt)}
                                    </p>
                                </div>
                                {getFrameworkBadge(model.framework)}
                            </div>

                            {/* Accuracy */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-zinc-400">Accuracy</span>
                                    <span className="text-lg font-bold text-green-400">
                                        {(model.accuracy * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-zinc-800 rounded-full h-2">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                                        style={{ width: `${model.accuracy * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-[#13161c] p-3 rounded-lg">
                                    <div className="text-xs text-zinc-500 mb-1">Train Loss</div>
                                    <div className="text-sm font-medium text-white">
                                        {model.metrics.trainLoss.toFixed(3)}
                                    </div>
                                </div>
                                <div className="bg-[#13161c] p-3 rounded-lg">
                                    <div className="text-xs text-zinc-500 mb-1">Val Loss</div>
                                    <div className="text-sm font-medium text-white">
                                        {model.metrics.valLoss.toFixed(3)}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Architecture</span>
                                    <span className="text-white font-medium">
                                        {model.architecture.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Size</span>
                                    <span className="text-white font-medium">{formatFileSize(model.sizeBytes)}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Link
                                    href={`/ai-training/models/${model.id}`}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </Link>
                                <button
                                    onClick={() => {
                                        console.log("Downloading model:", model.id);
                                    }}
                                    className="flex-1 px-4 py-2 bg-[#13161c] hover:bg-[#1a1f28] text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                                <button
                                    onClick={() => deleteModel(model.id)}
                                    className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
