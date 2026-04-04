import mysql from 'mysql2/promise';

export const db_conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'next_js',
});
