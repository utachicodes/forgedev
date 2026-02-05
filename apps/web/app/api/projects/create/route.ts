import { NextRequest, NextResponse } from 'next/server';
import { SUBSCRIPTION_LIMITS, hasExceededLimit, UsageMetrics } from '@/lib/subscription-limits';

// Mock function to get current usage
async function getUserUsageMetrics(userId: string): Promise<UsageMetrics> {
    const currentMonth = new Date().toISOString().slice(0, 7);

    return {
        userId,
        period: currentMonth,
        aiTraining: {
            hoursUsed: 35,
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

        // Check project limits before creating
        const usage = await getUserUsageMetrics(userId);

        const limitCheck = hasExceededLimit(usage, 'PROJECTS');
        if (limitCheck.exceeded) {
            return NextResponse.json(
                {
                    error: limitCheck.message,
                    limit_type: 'PROJECTS',
                    current_usage: usage.projects,
                    limits: SUBSCRIPTION_LIMITS.PROJECTS,
                },
                { status: 429 }
            );
        }

        // TODO: Create project in database
        const projectId = `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        return NextResponse.json({
            success: true,
            project_id: projectId,
            message: 'Project created successfully',
            remaining_projects: SUBSCRIPTION_LIMITS.PROJECTS.MAX_ACTIVE_PROJECTS - usage.projects.activeCount - 1,
        });

    } catch (error) {
        console.error('Project creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const userId = 'default-user'; // TODO: Get from auth session

    try {
        const usage = await getUserUsageMetrics(userId);

        return NextResponse.json({
            limits: SUBSCRIPTION_LIMITS.PROJECTS,
            current_usage: usage.projects,
            percentage_used: {
                projects: Math.round((usage.projects.activeCount / SUBSCRIPTION_LIMITS.PROJECTS.MAX_ACTIVE_PROJECTS) * 100),
                repositories: Math.round((usage.projects.totalRepositories / SUBSCRIPTION_LIMITS.PROJECTS.MAX_REPOSITORIES) * 100),
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
