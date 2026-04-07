'use client';
import { useState } from 'react';

export default function Home() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleSubmit = async () => {
        const url = isLogin ? '/api/login' : '/api/register';
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (isLogin && data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/welcome';
        } else {
            alert(data.message);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>{isLogin ? 'Login' : 'Signup'}</h1>

            {!isLogin && (
                <input
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
            )}

            <input
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button onClick={handleSubmit}>
                {isLogin ? 'Login' : 'Signup'}
            </button>

            <p
                onClick={() => setIsLogin(!isLogin)}
                style={{ cursor: 'pointer' }}
            >
                Switch to {isLogin ? 'Signup' : 'Login'}
            </p>
        </div>
    );
}
