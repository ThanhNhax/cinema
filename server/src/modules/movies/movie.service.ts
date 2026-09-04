import { Movie, movieRepository, ShowTimeDetail } from "./movie.repository";

interface PaginationResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export class MovieService {
    async getMovies(
        page: number = 1,
        limit: number = 10,
    ): Promise<PaginationResult<Movie>> {
        const safePage = Math.max(1, page);
        const safeLimit = Math.min(100, limit);
        const offset = (safePage - 1) * safeLimit;

        const [movies, total] = await Promise.all([
            movieRepository.findAll(safeLimit, offset),
            movieRepository.countAll(),
        ]);

        return {
            data: movies,
            pagination: {
                page: safePage,
                limit: safeLimit,
                total,
                totalPages: Math.ceil(total / safeLimit),
            },
        };
    }
    async getMovieById(id: string): Promise<Movie> {
        const movie = await movieRepository.findById(id);
        if (!movie) {
            const error: any = new Error(`không tìm thấy movies với id: ${id}`);
            error.statusCode = 404;
            throw error;
        }
        return movie;
    }

    async getShowTimeMovie(id: string): Promise<ShowTimeDetail[]> {
        const movie = await movieRepository.findById(id)
        if (!movie) {
            const error: any = new Error(`không tìm thấy suất chiếu  với id: ${id}`);
            error.statusCode = 404;
            throw error;
        }

        const showTime = await movieRepository.getShowTimeMovies(id);
        return showTime;
    }
}
export const movieService = new MovieService();
