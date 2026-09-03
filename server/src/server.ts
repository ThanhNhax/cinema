import express, {Express, Request, Response } from "express";
import { pool } from "./config/db";
import routeMovies from "./modules/movies/moive.routes";

interface User {
    id: number;
    username: string;
    email: string;
}

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/api/test-db", async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT NOW() as current_time, curren_database();')
      res.status(200).json({
            succes: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.log("Lỗi try vấn db", error);
        res.status(500).json({
            succes: false,
            message: "Database connecton failed",
        });
    }
});
app.use('/api/movies', routeMovies)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
