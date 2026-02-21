import { NextResponse } from 'next/server';
import { PLANS } from '@/lib/plans';

export async function GET() {
    try {
        return NextResponse.json({ success: true, data: PLANS });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch plans' },
            { status: 500 }
        );
    }
}
