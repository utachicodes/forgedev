"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileImage, FileText, FileVideo, File, X, CheckCircle } from "lucide-react";

interface UploadedFile {
    file: File;
    progress: number;
    status: "pending" | "uploading" | "completed" | "error";
    id: string;
}

interface DatasetUploaderProps {
    onUploadComplete?: (datasetId: string) => void;
}

export default function DatasetUploader({ onUploadComplete }: DatasetUploaderProps) {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [datasetName, setDatasetName] = useState("");
    const [datasetType, setDatasetType] = useState<"IMAGE" | "TEXT" | "TABULAR" | "VIDEO">("IMAGE");

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
            file,
            progress: 0,
            status: "pending",
            id: Math.random().toString(36).substr(2, 9),
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".webp"],
            "text/csv": [".csv"],
            "application/json": [".json"],
            "video/*": [".mp4", ".avi", ".mov"],
            "application/zip": [".zip"],
        },
    });

    const uploadFiles = async () => {
        if (!datasetName.trim()) {
            alert("Please enter a dataset name");
            return;
        }

        for (const uploadFile of files) {
            if (uploadFile.status === "completed") continue;

            setFiles((prev) =>
                prev.map((f) =>
                    f.id === uploadFile.id ? { ...f, status: "uploading", progress: 0 } : f
                )
            );

            const formData = new FormData();
            formData.append("file", uploadFile.file);
            formData.append("name", datasetName);
            formData.append("type", datasetType);

            try {
                // Simulate upload progress
                for (let progress = 0; progress <= 100; progress += 10) {
                    await new Promise((resolve) => setTimeout(resolve, 200));
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === uploadFile.id ? { ...f, progress } : f
                        )
                    );
                }

                // Actual upload to API
                const response = await fetch("http://localhost:5000/datasets/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Upload failed");

                const data = await response.json();

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === uploadFile.id ? { ...f, status: "completed", progress: 100 } : f
                    )
                );

                if (onUploadComplete && data.dataset_id) {
                    onUploadComplete(data.dataset_id);
                }
            } catch (error) {
                console.error("Upload error:", error);
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === uploadFile.id ? { ...f, status: "error" } : f
                    )
                );
            }
        }
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) return <FileImage className="w-5 h-5" />;
        if (file.type.startsWith("video/")) return <FileVideo className="w-5 h-5" />;
        if (file.type === "text/csv" || file.type === "application/json")
            return <FileText className="w-5 h-5" />;
        return <File className="w-5 h-5" />;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    return (
        <div className="space-y-6">
            {/* Dataset Info */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Dataset Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">Dataset Name</label>
                        <input
                            type="text"
                            value={datasetName}
                            onChange={(e) => setDatasetName(e.target.value)}
                            placeholder="e.g., ImageNet Subset"
                            className="w-full bg-[#13161c] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">Dataset Type</label>
                        <select
                            value={datasetType}
                            onChange={(e) => setDatasetType(e.target.value as any)}
                            className="w-full bg-[#13161c] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="IMAGE">Image Dataset</option>
                            <option value="TEXT">Text Dataset</option>
                            <option value="TABULAR">Tabular Data</option>
                            <option value="VIDEO">Video Dataset</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Upload Area */}
            <div
                {...getRootProps()}
                className={`glass-card p-12 border-2 border-dashed cursor-pointer transition-all ${isDragActive
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
            >
                <input {...getInputProps()} />
                <div className="text-center">
                    <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                    {isDragActive ? (
                        <p className="text-blue-400 font-medium">Drop files here...</p>
                    ) : (
                        <>
                            <p className="text-white font-medium mb-2">
                                Drag & drop files here, or click to browse
                            </p>
                            <p className="text-sm text-zinc-400">
                                Supports images, CSV, JSON, videos, and ZIP archives
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Files ({files.length})
                    </h3>
                    <div className="space-y-3">
                        {files.map((uploadFile) => (
                            <div
                                key={uploadFile.id}
                                className="flex items-center gap-4 p-3 bg-[#13161c] rounded-lg"
                            >
                                <div className="text-zinc-400">{getFileIcon(uploadFile.file)}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-medium truncate">
                                            {uploadFile.file.name}
                                        </p>
                                        <p className="text-xs text-zinc-500 ml-2">
                                            {formatFileSize(uploadFile.file.size)}
                                        </p>
                                    </div>
                                    {uploadFile.status === "uploading" && (
                                        <div className="w-full bg-zinc-800 rounded-full h-1.5">
                                            <div
                                                className="bg-blue-500 h-1.5 rounded-full transition-all"
                                                style={{ width: `${uploadFile.progress}%` }}
                                            />
                                        </div>
                                    )}
                                    {uploadFile.status === "completed" && (
                                        <div className="flex items-center gap-1 text-xs text-green-400">
                                            <CheckCircle className="w-3 h-3" />
                                            Uploaded
                                        </div>
                                    )}
                                    {uploadFile.status === "error" && (
                                        <p className="text-xs text-red-400">Upload failed</p>
                                    )}
                                </div>
                                {uploadFile.status !== "uploading" && (
                                    <button
                                        onClick={() => removeFile(uploadFile.id)}
                                        className="text-zinc-500 hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={uploadFiles}
                        disabled={files.every((f) => f.status === "completed")}
                        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Upload Dataset
                    </button>
                </div>
            )}
        </div>
    );
}
