import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/authMiddleware';

export async function GET(req: Request) {
    const userOrResponse = requireAuth(req);

    // if middleware returns NextResponse, stop execution
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const user = userOrResponse; // decoded JWT
    console.log('Authenticated user:', user);

    return NextResponse.json({ message: 'Success', user });
}
