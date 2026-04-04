import { db_conn } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [rows] = await db_conn.query('SELECT * FROM users');
        console.log(rows);
        console.log('Hi');
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { name, email } = await request.json();
        const [result] = await db_conn.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );
        console.log(result);
        return NextResponse.json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
