import { NextRequest, NextResponse } from 'next/server';
import { SUBSCRIPTION_LIMITS, hasExceededLimit, UsageMetrics } from '@/lib/subscription-limits';

// Mock function to get current usage - replace with actual database query
async function getUserUsageMetrics(userId: string): Promise<UsageMetrics> {
    // TODO: Replace with actual database query
    // This would typically query your database for current usage stats
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

    return {
        userId,
        period: currentMonth,
        aiTraining: {
            hoursUsed: 35, // Example: user has used 35 hours
            jobsRunToday: 5,
            concurrentJobs: 2,
        },
        projects: {
            activeCount: 7,
            totalRepositories: 12,
        },
        storage: {
            usedGB: 45,
            bandwidthGB: 120,
        },
        deployment: {
            deploymentsToday: 8,
            buildMinutesUsed: 280,
            activeDeployments: 3,
        },
        api: {
            requestsToday: 5200,
            requestsThisMinute: 45,
        },
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const userId = 'default-user'; // TODO: Get from auth session

        // Check usage limits before starting training
        const usage = await getUserUsageMetrics(userId);

        // Check AI training limits
        const limitCheck = hasExceededLimit(usage, 'AI_TRAINING');
        if (limitCheck.exceeded) {
            return NextResponse.json(
                {
                    error: limitCheck.message,
                    limit_type: 'AI_TRAINING',
                    current_usage: usage.aiTraining,
                    limits: SUBSCRIPTION_LIMITS.AI_TRAINING,
                },
                { status: 429 } // Too Many Requests
            );
        }

        // Check if dataset size exceeds limit (if provided)
        if (body.dataset_size_gb && body.dataset_size_gb > SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_DATASET_SIZE_GB) {
            return NextResponse.json(
                {
                    error: `Dataset size exceeds maximum allowed size (${SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_DATASET_SIZE_GB}GB)`,
                    limit_type: 'DATASET_SIZE',
                    current_size: body.dataset_size_gb,
                    max_size: SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_DATASET_SIZE_GB,
                },
                { status: 400 }
            );
        }

        // TODO: Forward request to AI training service
        // For now, return a mock response
        const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // TODO: Track this job start in database for usage metrics

        return NextResponse.json({
            success: true,
            job_id: jobId,
            message: 'Training job started successfully',
            estimated_hours: Math.ceil(body.epochs * 0.5), // Rough estimate
            remaining_hours: SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_HOURS_PER_MONTH - usage.aiTraining.hoursUsed,
        });

    } catch (error) {
        console.error('Training start error:', error);
        return NextResponse.json(
            { error: 'Failed to start training job' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const userId = 'default-user'; // TODO: Get from auth session

    try {
        const usage = await getUserUsageMetrics(userId);

        return NextResponse.json({
            limits: SUBSCRIPTION_LIMITS.AI_TRAINING,
            current_usage: usage.aiTraining,
            percentage_used: {
                hours: Math.round((usage.aiTraining.hoursUsed / SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_HOURS_PER_MONTH) * 100),
                daily_jobs: Math.round((usage.aiTraining.jobsRunToday / SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_TRAINING_JOBS_PER_DAY) * 100),
                concurrent: Math.round((usage.aiTraining.concurrentJobs / SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_CONCURRENT_JOBS) * 100),
            },
        });
    } catch (error) {
        console.error('Usage fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch usage metrics' },
            { status: 500 }
        );
    }
}
