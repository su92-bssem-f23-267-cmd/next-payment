import { NextResponse } from 'next/server';
import { getPlanBySlug } from '@/lib/plans';

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const plan = getPlanBySlug(slug);

    if (!plan) {
        return NextResponse.json(
            { success: false, error: `Plan "${slug}" not found` },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, data: plan });
}
