'use client';
import { useState, useEffect } from 'react';
import { User } from '../types';

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const createUser = async () => {
        alert('Creating user with name: ' + name + ' and email: ' + email);
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            const data = await response.json();
            console.log(data);
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    useEffect(() => {
        console.log('Running useEffect to fetch users');
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h1 className="text-5xl font-bold text-center">User App</h1>
                <div className="w-full mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Create User</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full mb-4"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full mb-4"
                    />
                    <button
                        onClick={createUser}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    >
                        Create User
                    </button>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">
                        Users List
                    </h2>
                    <button
                        onClick={fetchUsers}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4"
                    >
                        Fetch Users
                    </button>
                    {users.length === 0 ? (
                        <p>No users found. Click `Fetch Users` to load data.</p>
                    ) : (
                        <table
                            id="users-table"
                            className="min-w-full bg-white dark:bg-black"
                        >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}
