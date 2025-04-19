import mysql from 'mysql';
import dotenv from "dotenv"
export let connection = false;

dotenv.config()

export const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    multipleStatements: true,
});

export const checkConnection = () => {
    return db.connect((err, res) => {
        if (err) {
            connection = false
            throw err
        } else {
            connection = true
            console.log("Database connected!")
        }
    })
}