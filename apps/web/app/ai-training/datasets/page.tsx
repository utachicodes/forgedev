"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Database, Search, Filter, BarChart3, FileImage, FileText, Table, Video, Music, Eye, Trash2, Download } from "lucide-react";

interface Dataset {
    id: string;
    name: string;
    type: "IMAGE" | "TEXT" | "TABULAR" | "VIDEO" | "AUDIO";
    format: string;
    sizeBytes: number;
    numSamples: number | null;
    createdAt: string;
    storagePath: string;
}

export default function DatasetsPage() {
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<string>("all");
    const [showUploader, setShowUploader] = useState(false);

    useEffect(() => {
        fetchDatasets();
    }, []);

    const fetchDatasets = async () => {
        try {
            // In production, this would fetch from your API
            const response = await fetch("http://localhost:5000/datasets");
            if (response.ok) {
                const data = await response.json();
                setDatasets(data.datasets || []);
            }
        } catch (error) {
            console.error("Failed to fetch datasets:", error);
            // Mock data for demonstration
            setDatasets([
                {
                    id: "1",
                    name: "CIFAR-10 Images",
                    type: "IMAGE",
                    format: "IMAGES_ZIP",
                    sizeBytes: 163000000,
                    numSamples: 60000,
                    createdAt: new Date().toISOString(),
                    storagePath: "/uploads/cifar10.zip",
                },
                {
                    id: "2",
                    name: "Customer Reviews",
                    type: "TEXT",
                    format: "CSV",
                    sizeBytes: 5500000,
                    numSamples: 50000,
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    storagePath: "/uploads/reviews.csv",
                },
                {
                    id: "3",
                    name: "Sales Data 2024",
                    type: "TABULAR",
                    format: "CSV",
                    sizeBytes: 2100000,
                    numSamples: 12500,
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    storagePath: "/uploads/sales.csv",
                },
            ]);
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

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "IMAGE":
                return <FileImage className="w-5 h-5 text-blue-400" />;
            case "TEXT":
                return <FileText className="w-5 h-5 text-green-400" />;
            case "TABULAR":
                return <Table className="w-5 h-5 text-purple-400" />;
            case "VIDEO":
                return <Video className="w-5 h-5 text-red-400" />;
            case "AUDIO":
                return <Music className="w-5 h-5 text-yellow-400" />;
            default:
                return <Database className="w-5 h-5 text-zinc-400" />;
        }
    };

    const getTypeBadgeColor = (type: string) => {
        switch (type) {
            case "IMAGE":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "TEXT":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "TABULAR":
                return "bg-purple-500/10 text-purple-400 border-purple-500/20";
            case "VIDEO":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            case "AUDIO":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            default:
                return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
        }
    };

    const filteredDatasets = datasets.filter((dataset) => {
        const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || dataset.type === filterType;
        return matchesSearch && matchesType;
    });

    const deleteDataset = async (id: string) => {
        if (!confirm("Are you sure you want to delete this dataset?")) return;

        try {
            // await fetch(`http://localhost:5000/datasets/${id}`, { method: 'DELETE' });
            setDatasets((prev) => prev.filter((d) => d.id !== id));
        } catch (error) {
            console.error("Failed to delete dataset:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#030508] text-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent mb-2">
                            Datasets
                        </h1>
                        <p className="text-zinc-400">
                            Manage your training datasets and preprocessing pipelines
                        </p>
                    </div>
                    <Link
                        href="/ai-training/datasets/upload"
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                        <Database className="w-5 h-5" />
                        Upload Dataset
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Total Datasets</p>
                                <p className="text-2xl font-bold text-white">{datasets.length}</p>
                            </div>
                            <Database className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Total Samples</p>
                                <p className="text-2xl font-bold text-white">
                                    {datasets.reduce((acc, d) => acc + (d.numSamples || 0), 0).toLocaleString()}
                                </p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-green-400" />
                        </div>
                    </div>
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Storage Used</p>
                                <p className="text-2xl font-bold text-white">
                                    {formatFileSize(datasets.reduce((acc, d) => acc + d.sizeBytes, 0))}
                                </p>
                            </div>
                            <Download className="w-8 h-8 text-purple-400" />
                        </div>
                    </div>
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Image Datasets</p>
                                <p className="text-2xl font-bold text-white">
                                    {datasets.filter((d) => d.type === "IMAGE").length}
                                </p>
                            </div>
                            <FileImage className="w-8 h-8 text-amber-400" />
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
                            placeholder="Search datasets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#13161c] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-[#13161c] border border-white/10 rounded-lg pl-10 pr-10 py-2 text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="all">All Types</option>
                            <option value="IMAGE">Images</option>
                            <option value="TEXT">Text</option>
                            <option value="TABULAR">Tabular</option>
                            <option value="VIDEO">Video</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Datasets Grid */}
            {loading ? (
                <div className="glass-card p-12 text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-zinc-400">Loading datasets...</p>
                </div>
            ) : filteredDatasets.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <Database className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-400 mb-2">No datasets found</p>
                    <p className="text-sm text-zinc-500">Upload your first dataset to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDatasets.map((dataset) => (
                        <div
                            key={dataset.id}
                            className="glass-card p-6 hover:bg-[#13161c]/60 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {getTypeIcon(dataset.type)}
                                    <div>
                                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                            {dataset.name}
                                        </h3>
                                        <p className="text-xs text-zinc-500">{formatDate(dataset.createdAt)}</p>
                                    </div>
                                </div>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium border ${getTypeBadgeColor(
                                        dataset.type
                                    )}`}
                                >
                                    {dataset.type}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Samples</span>
                                    <span className="text-white font-medium">
                                        {dataset.numSamples?.toLocaleString() || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Size</span>
                                    <span className="text-white font-medium">
                                        {formatFileSize(dataset.sizeBytes)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Format</span>
                                    <span className="text-white font-medium">{dataset.format}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Link
                                    href={`/ai-training/datasets/${dataset.id}`}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </Link>
                                <Link
                                    href={`/ai-training/datasets/${dataset.id}/stats`}
                                    className="flex-1 px-4 py-2 bg-[#13161c] hover:bg-[#1a1f28] text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <BarChart3 className="w-4 h-4" />
                                    Stats
                                </Link>
                                <button
                                    onClick={() => deleteDataset(dataset.id)}
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
