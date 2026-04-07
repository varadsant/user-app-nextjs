// app/api/login/route.ts
import { db_conn } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { User } from '@/types';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await db_conn.query('SELECT * FROM users WHERE email = ?', [
        email,
    ]);

    const users = rows as User[];
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password || ''))) {
        return NextResponse.json(
            { message: 'Invalid credentials' },
            { status: 401 }
        );
    }

    const token = signToken({
        id: user.id,
        email: user.email,
        name: user.name,
    });

    console.log(
        `Generated JWT token for user ${user.id} + ${user.email}: `,
        token
    );

    return NextResponse.json({ token });
}
