"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatasetUploader from "@/components/DatasetUploader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UploadDatasetPage() {
    const router = useRouter();

    const handleUploadComplete = (datasetId: string) => {
        // Redirect to dataset details page
        router.push(`/ai-training/datasets/${datasetId}`);
    };

    return (
        <div className="min-h-screen bg-[#030508] text-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/ai-training/datasets"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Datasets
                    </Link>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent mb-2">
                        Upload Dataset
                    </h1>
                    <p className="text-zinc-400">
                        Upload your training data for AI model development
                    </p>
                </div>

                {/* Uploader */}
                <DatasetUploader onUploadComplete={handleUploadComplete} />
            </div>
        </div>
    );
}
