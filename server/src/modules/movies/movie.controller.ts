import { NextFunction, Request, Response } from "express";
import { movieService } from "./movie.service";

export class MovieController {
    getListMovie = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query?.page);
            const limit = Number(req.query?.limit);
            const result = await movieService.getMovies(page, limit);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    };

    getMovieById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await movieService.getMovieById(id as string);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    };
    getShowTimeMovie = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const id = req.params.id;
            const result = await movieService.getShowTimeMovie(id as string);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    };
}

export const movieController = new MovieController();
