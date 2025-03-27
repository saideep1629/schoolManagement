import mysql from "mysql2/promise";
import { DB_NAME } from "../constant.js";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3307,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
})

const connectDB = async() => {
    try {
        const connection = await pool.getConnection();
        console.log(`connected successfully to mqsql. Database host is ${process.env.DB_HOST}`);
        connection.release();
        
    } catch (error) {
        console.log("Mysql connection error", error);
        process.exit(1);
    }
}

export { connectDB, pool }