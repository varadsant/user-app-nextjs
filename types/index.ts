export interface User {
    id: number;
    name: string;
    email: string;
    password?: string; // Optional, as we might not want to expose it
}
