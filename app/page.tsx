'use client';
import { useEffect, useState } from 'react';

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

    console.log('Rendering form with state:', { isLogin, form });

    useEffect(() => {
        const cleanForm = () => {
            console.log('Cleaning form...');
            setForm({ name: '', email: '', password: '' });
        };

        cleanForm();
    }, [isLogin]);

    return (
        <div style={{ padding: 20 }}>
            <h1>{isLogin ? 'Login' : 'Signup'}</h1>

            {!isLogin && (
                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm((current) => ({
                            ...current,
                            name: e.target.value,
                        }))
                    }
                />
            )}

            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                    setForm((current) => ({
                        ...current,
                        email: e.target.value,
                    }))
                }
            />
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                    setForm((current) => ({
                        ...current,
                        password: e.target.value,
                    }))
                }
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
