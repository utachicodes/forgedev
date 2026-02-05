"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Brain,
    Cpu,
    Database,
    Zap,
    Plus,
    TrendingUp,
    FileImage,
    Layers,
} from "lucide-react";

const frameworks = [
    {
        id: "pytorch",
        name: "PyTorch",
        icon: "🔥",
        description: "Dynamic computation graphs, research-friendly",
        useCases: ["Image Classification", "Object Detection", "GANs", "NLP"],
        color: "from-orange-600 to-red-600",
        shadowColor: "rgba(234, 88, 12, 0.4)",
    },
    {
        id: "tensorflow",
        name: "TensorFlow",
        icon: "📊",
        description: "Production-ready, scalable deployment",
        useCases: ["Image Recognition", "Time Series", "Recommendation", "Vision"],
        color: "from-amber-500 to-orange-600",
        shadowColor: "rgba(245, 158, 11, 0.4)",
    },
    {
        id: "scikit_learn",
        name: "Scikit-learn",
        icon: "🔬",
        description: "Classical ML, feature engineering",
        useCases: ["Classification", "Regression", "Clustering", "Dimensionality Reduction"],
        color: "from-blue-600 to-cyan-600",
        shadowColor: "rgba(37, 99, 235, 0.4)",
    },
    {
        id: "huggingface",
        name: "Hugging Face",
        icon: "🤗",
        description: "Transformers, NLP models, pre-trained",
        useCases: ["Text Classification", "Named Entity Recognition", "Translation", "Summarization"],
        color: "from-yellow-500 to-amber-500",
        shadowColor: "rgba(234, 179, 8, 0.4)",
    },
];

const recentJobs = [
    {
        id: "1",
        name: "ResNet50 ImageNet",
        framework: "PyTorch",
        status: "completed",
        accuracy: 94.2,
        duration: "2h 15m",
    },
    {
        id: "2",
        name: "YOLO Object Detection",
        framework: "TensorFlow",
        status: "running",
        accuracy: 87.5,
        duration: "Running...",
    },
    {
        id: "3",
        name: "Random Forest Classifier",
        framework: "Scikit-learn",
        status: "completed",
        accuracy: 91.8,
        duration: "5m 32s",
    },
];

export default function AITrainingPage() {
    const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[#030508] text-white p-8">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-500/20">
                        <Brain className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                            AI Training Platform
                        </h1>
                        <p className="text-zinc-400 mt-1">
                            Train and deploy machine learning models with any framework
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Cpu className="w-5 h-5 text-blue-400" />
                            <span className="text-2xl font-bold text-blue-400">12</span>
                        </div>
                        <p className="text-sm text-zinc-400">Trained Models</p>
                    </div>
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Database className="w-5 h-5 text-green-400" />
                            <span className="text-2xl font-bold text-green-400">8</span>
                        </div>
                        <p className="text-sm text-zinc-400">Datasets</p>
                    </div>
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Zap className="w-5 h-5 text-amber-400" />
                            <span className="text-2xl font-bold text-amber-400">2</span>
                        </div>
                        <p className="text-sm text-zinc-400">Active Trainings</p>
                    </div>
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                            <span className="text-2xl font-bold text-purple-400">94.2%</span>
                        </div>
                        <p className="text-sm text-zinc-400">Best Accuracy</p>
                    </div>
                </div>
            </div>

            {/* Framework Selection */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Layers className="w-6 h-6 text-blue-400" />
                    Choose Your Framework
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {frameworks.map((framework) => (
                        <div
                            key={framework.id}
                            onClick={() => setSelectedFramework(framework.id)}
                            className={`glass-card p-6 cursor-pointer transition-all duration-500 hover:scale-105 group ${selectedFramework === framework.id ? "ring-2 ring-blue-500" : ""
                                }`}
                            style={{
                                boxShadow: selectedFramework === framework.id
                                    ? `0 0 30px -5px ${framework.shadowColor}`
                                    : undefined,
                            }}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div className={`text-5xl`}>{framework.icon}</div>
                                {selectedFramework === framework.id && (
                                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{framework.name}</h3>
                            <p className="text-sm text-zinc-400 mb-4">{framework.description}</p>
                            <div className="space-y-1">
                                {framework.useCases.slice(0, 3).map((useCase, idx) => (
                                    <div key={idx} className="text-xs text-zinc-500 flex items-center gap-2">
                                        <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                                        {useCase}
                                    </div>
                                ))}
                            </div>
                            <Link
                                href={`/ai-training/train?framework=${framework.id}`}
                                className={`mt-4 w-full px-4 py-2 bg-gradient-to-r ${framework.color} text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Plus className="w-4 h-4" />
                                Start Training
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Link
                    href="/ai-training/datasets"
                    className="glass-card p-8 hover:bg-[#13161c]/60 transition-all duration-300 group"
                >
                    <FileImage className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">Manage Datasets</h3>
                    <p className="text-sm text-zinc-400">
                        Upload, preprocess, and version your training data
                    </p>
                </Link>
                <Link
                    href="/ai-training/models"
                    className="glass-card p-8 hover:bg-[#13161c]/60 transition-all duration-300 group"
                >
                    <Brain className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">View Models</h3>
                    <p className="text-sm text-zinc-400">
                        Browse trained models, compare metrics, and export
                    </p>
                </Link>
                <Link
                    href="/ai-training/experiments"
                    className="glass-card p-8 hover:bg-[#13161c]/60 transition-all duration-300 group"
                >
                    <TrendingUp className="w-10 h-10 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">Experiments</h3>
                    <p className="text-sm text-zinc-400">
                        Track experiments, compare runs, and analyze results
                    </p>
                </Link>
            </div>

            {/* Recent Training Jobs */}
            <div>
                <h2 className="text-2xl font-bold mb-6">Recent Training Jobs</h2>
                <div className="glass-card overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-white/5">
                            <tr>
                                <th className="text-left p-4 text-zinc-400 font-medium">Name</th>
                                <th className="text-left p-4 text-zinc-400 font-medium">Framework</th>
                                <th className="text-left p-4 text-zinc-400 font-medium">Status</th>
                                <th className="text-left p-4 text-zinc-400 font-medium">Accuracy</th>
                                <th className="text-left p-4 text-zinc-400 font-medium">Duration</th>
                                <th className="text-left p-4 text-zinc-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentJobs.map((job) => (
                                <tr
                                    key={job.id}
                                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="p-4 font-medium">{job.name}</td>
                                    <td className="p-4 text-zinc-400">{job.framework}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === "completed"
                                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                }`}
                                        >
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-green-400">{job.accuracy}%</td>
                                    <td className="p-4 text-zinc-400">{job.duration}</td>
                                    <td className="p-4">
                                        <Link
                                            href={`/ai-training/monitor/${job.id}`}
                                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                        >
                                            {job.status === "running" ? "Monitor" : "View Details"}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
