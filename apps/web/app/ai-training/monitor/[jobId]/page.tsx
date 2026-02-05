"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Activity,
    Zap,
    TrendingUp,
    Clock,
    Cpu,
    HardDrive,
    CheckCircle,
    XCircle,
    Pause,
    Play,
    Square,
    Download,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface TrainingMetrics {
    epoch: number;
    loss: number;
    accuracy: number;
    val_loss: number;
    val_accuracy: number;
    learning_rate: number;
    timestamp: string;
}

interface TrainingJob {
    id: string;
    name: string;
    framework: string;
    status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "PAUSED";
    progress: number;
    currentEpoch: number;
    totalEpochs: number;
    startedAt: string;
    metrics: TrainingMetrics[];
    config: any;
}

export default function MonitorPage() {
    const params = useParams();
    const router = useRouter();
    const [job, setJob] = useState<TrainingJob | null>(null);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState<string[]>([]);
    const logsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchJobStatus();
        const interval = setInterval(fetchJobStatus, 2000); // Poll every 2 seconds
        return () => clearInterval(interval);
    }, [params.jobId]);

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    const fetchJobStatus = async () => {
        try {
            // In production, fetch from API
            // const response = await fetch(`http://localhost:5000/training/${params.jobId}`);
            // const data = await response.json();

            // Mock data for demonstration
            const mockJob: TrainingJob = {
                id: params.jobId as string,
                name: "PyTorch ResNet50 - CIFAR10",
                framework: "PYTORCH",
                status: "RUNNING",
                progress: 65,
                currentEpoch: 6,
                totalEpochs: 10,
                startedAt: new Date(Date.now() - 300000).toISOString(),
                config: {
                    learningRate: 0.001,
                    batchSize: 32,
                    optimizer: "adam",
                },
                metrics: Array.from({ length: 6 }, (_, i) => ({
                    epoch: i + 1,
                    loss: 2.5 - i * 0.3 + Math.random() * 0.1,
                    accuracy: 0.3 + i * 0.1 + Math.random() * 0.05,
                    val_loss: 2.6 - i * 0.28 + Math.random() * 0.15,
                    val_accuracy: 0.28 + i * 0.09 + Math.random() * 0.06,
                    learning_rate: 0.001,
                    timestamp: new Date(Date.now() - (6 - i) * 30000).toISOString(),
                })),
            };

            setJob(mockJob);

            // Mock logs
            if (logs.length === 0) {
                setLogs([
                    "[2024-02-05 17:00:00] Training started",
                    "[2024-02-05 17:00:01] Loading dataset: CIFAR-10",
                    "[2024-02-05 17:00:05] Dataset loaded: 60,000 samples",
                    "[2024-02-05 17:00:06] Building model: ResNet50",
                    "[2024-02-05 17:00:10] Model initialized with pre-trained weights",
                    "[2024-02-05 17:00:11] Starting epoch 1/10",
                    "[2024-02-05 17:01:30] Epoch 1/10 - loss: 2.456, acc: 0.342, val_loss: 2.601, val_acc: 0.298",
                    "[2024-02-05 17:03:00] Starting epoch 2/10",
                    "[2024-02-05 17:04:30] Epoch 2/10 - loss: 2.123, acc: 0.445, val_loss: 2.334, val_acc: 0.387",
                    "[2024-02-05 17:06:00] Starting epoch 3/10",
                    "[2024-02-05 17:07:30] Epoch 3/10 - loss: 1.834, acc: 0.532, val_loss: 2.012, val_acc: 0.468",
                    "[2024-02-05 17:09:00] Starting epoch 4/10",
                    "[2024-02-05 17:10:30] Epoch 4/10 - loss: 1.567, acc: 0.621, val_loss: 1.789, val_acc: 0.542",
                    "[2024-02-05 17:12:00] Starting epoch 5/10",
                    "[2024-02-05 17:13:30] Epoch 5/10 - loss: 1.298, acc: 0.698, val_loss: 1.501, val_acc: 0.625",
                    "[2024-02-05 17:15:00] Starting epoch 6/10",
                ]);
            }
        } catch (error) {
            console.error("Failed to fetch job status:", error);
        } finally {
            setLoading(false);
        }
    };

    const pauseTraining = async () => {
        // API call to pause training
        console.log("Pausing training...");
    };

    const resumeTraining = async () => {
        // API call to resume training
        console.log("Resuming training...");
    };

    const stopTraining = async () => {
        if (!confirm("Are you sure you want to stop training?")) return;
        // API call to stop training
        console.log("Stopping training...");
    };

    const downloadCheckpoint = () => {
        console.log("Downloading checkpoint...");
    };

    if (loading || !job) {
        return (
            <div className="min-h-screen bg-[#030508] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-zinc-400">Loading training job...</p>
                </div>
            </div>
        );
    }

    const lossData = {
        labels: job.metrics.map((m) => `Epoch ${m.epoch}`),
        datasets: [
            {
                label: "Training Loss",
                data: job.metrics.map((m) => m.loss),
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Validation Loss",
                data: job.metrics.map((m) => m.val_loss),
                borderColor: "rgb(168, 85, 247)",
                backgroundColor: "rgba(168, 85, 247, 0.1)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const accuracyData = {
        labels: job.metrics.map((m) => `Epoch ${m.epoch}`),
        datasets: [
            {
                label: "Training Accuracy",
                data: job.metrics.map((m) => m.accuracy),
                borderColor: "rgb(34, 197, 94)",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Validation Accuracy",
                data: job.metrics.map((m) => m.val_accuracy),
                borderColor: "rgb(251, 191, 36)",
                backgroundColor: "rgba(251, 191, 36, 0.1)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    color: "#a1a1aa",
                    font: {
                        size: 12,
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(255, 255, 255, 0.05)",
                },
                ticks: {
                    color: "#71717a",
                },
            },
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.05)",
                },
                ticks: {
                    color: "#71717a",
                },
            },
        },
    };

    const getStatusBadge = () => {
        switch (job.status) {
            case "RUNNING":
                return (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium flex items-center gap-1">
                        <Activity className="w-3 h-3 animate-pulse" />
                        Running
                    </span>
                );
            case "COMPLETED":
                return (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                    </span>
                );
            case "FAILED":
                return (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Failed
                    </span>
                );
            case "PAUSED":
                return (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium flex items-center gap-1">
                        <Pause className="w-3 h-3" />
                        Paused
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 bg-zinc-500/20 text-zinc-400 rounded-full text-sm font-medium">
                        Pending
                    </span>
                );
        }
    };

    const latestMetrics = job.metrics[job.metrics.length - 1];

    return (
        <div className="min-h-screen bg-[#030508] text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/ai-training"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to AI Training
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent mb-2">
                                {job.name}
                            </h1>
                            <div className="flex items-center gap-3">
                                {getStatusBadge()}
                                <span className="text-sm text-zinc-500">
                                    Started {new Date(job.startedAt).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex gap-2">
                            {job.status === "RUNNING" && (
                                <>
                                    <button
                                        onClick={pauseTraining}
                                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                                    >
                                        <Pause className="w-4 h-4" />
                                        Pause
                                    </button>
                                    <button
                                        onClick={stopTraining}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                                    >
                                        <Square className="w-4 h-4" />
                                        Stop
                                    </button>
                                </>
                            )}
                            {job.status === "PAUSED" && (
                                <button
                                    onClick={resumeTraining}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    Resume
                                </button>
                            )}
                            <button
                                onClick={downloadCheckpoint}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="glass-card p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-blue-400" />
                            <span className="font-medium">
                                Epoch {job.currentEpoch} / {job.totalEpochs}
                            </span>
                        </div>
                        <span className="text-sm text-zinc-400">{job.progress}% complete</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${job.progress}%` }}
                        />
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-zinc-400">Training Loss</span>
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {latestMetrics?.loss.toFixed(4) || "N/A"}
                        </div>
                    </div>

                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-zinc-400">Validation Loss</span>
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {latestMetrics?.val_loss.toFixed(4) || "N/A"}
                        </div>
                    </div>

                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-zinc-400">Training Accuracy</span>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {latestMetrics ? `${(latestMetrics.accuracy * 100).toFixed(2)}%` : "N/A"}
                        </div>
                    </div>

                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-zinc-400">Val Accuracy</span>
                            <CheckCircle className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {latestMetrics ? `${(latestMetrics.val_accuracy * 100).toFixed(2)}%` : "N/A"}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Loss Chart */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4">Loss Over Time</h3>
                        <div className="h-64">
                            <Line data={lossData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Accuracy Chart */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4">Accuracy Over Time</h3>
                        <div className="h-64">
                            <Line data={accuracyData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Training Logs */}
                    <div className="lg:col-span-2 glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-400" />
                            Training Logs
                        </h3>
                        <div className="bg-[#0a0d12] rounded-lg p-4 h-80 overflow-y-auto font-mono text-sm">
                            {logs.map((log, idx) => (
                                <div key={idx} className="text-zinc-400 mb-1">
                                    {log}
                                </div>
                            ))}
                            <div ref={logsEndRef} />
                        </div>
                    </div>

                    {/* Configuration */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-purple-400" />
                            Configuration
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Framework</span>
                                <span className="text-white font-medium">{job.framework}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Learning Rate</span>
                                <span className="text-white font-medium">{job.config.learningRate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Batch Size</span>
                                <span className="text-white font-medium">{job.config.batchSize}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Optimizer</span>
                                <span className="text-white font-medium">{job.config.optimizer.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
