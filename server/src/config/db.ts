import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true
});

pool.on("connect", () => {
    console.log("✅ Đã kết nối thành công tới PostgreSQL!");
});

pool.on("error", (err) => {
    console.error("❌ Lỗi PostgreSQL:", err);
    process.exit(-1);
});
