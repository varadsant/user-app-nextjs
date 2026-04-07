'use client';

import { User } from '@/types';
import { useEffect, useState } from 'react';

export default function Welcome() {
    const [user, setUser] = useState<User | null>(null);
    console.log(user);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
            return;
        }

        fetch('/api/protected', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setUser(data.user))
            .catch((err) => console.log(err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Welcome! You are logged in 🎉</h1>
            {user && <p>Hello, {user.name}!</p>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
