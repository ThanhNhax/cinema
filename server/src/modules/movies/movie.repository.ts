import { pool } from "../../config/db";

export interface Movie {
    id: string;
    title: string;
    description: string | null;
    trailerUrl: string | null;
    durationMin: number;
    bannerUrl: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

export interface ShowTimeDetail {
    id: string;
    movieId: string;
    roomId: string;
    roomName: string;
    cinemaId: string;
    cinemaName: string;
    cinemaAddress: string;
    startTime: Date;
    endTime: Date;
}

export class MovieRepository {
    async findAll(limit: number = 10, offset: number = 0): Promise<Movie[]> {
        const query = `SELECT id, title, description, trailer_url as "trailerUrl", duration_min as "durationMin", banner_url as "bannerUrl", created_at as "createdAt", updated_at as "updatedAt"
      FROM movies
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2;`;
        const result = await pool.query(query, [limit, offset]);
        return result.rows;
    }

    async countAll(): Promise<number> {
        const query = `Select count(*) as total from movies;`;
        const result = await pool.query(query);
        return parseInt(result.rows[0].total, 10);
    }
    async findById(id: string): Promise<Movie | null> {
        const query = `
      SELECT id, title, description, trailer_url as "trailerUrl", duration_min as "durationMin", banner_url as "bannerUrl", created_at as "createdAt", updated_at as "updatedAt"
      FROM movies
      WHERE id = $1;
    `;
        const result = await pool.query<Movie>(query, [id]);
        return result.rows[0] || null;
    }

    async getShowTimeMovies(id: string): Promise<ShowTimeDetail[]> {
        const query = `select s.id,
          s.movie_id AS "movieId",
          s.room_id AS "roomId",
          r.name AS "roomName",
          c.id AS "cinemaId",
          c.name AS "cinemaName",
          c.address AS "cinemaAddress",
          s.start_time AS "startTime",
          s.end_time AS "endTime" from showtimes s 
          left join rooms r
          on r.id = s.room_id
          left join cinemas c 
          on c.id = r.cinema_id 
          where s.movie_id = $1;`;
        const result = await pool.query<ShowTimeDetail>(query, [id]);
        return result.rows;
    }
}

export const movieRepository = new MovieRepository();
