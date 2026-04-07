import { NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function requireAuth(req: Request) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader)
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        const decoded = verifyToken(token);
        return decoded; // return user info if valid
    } catch (err) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}
