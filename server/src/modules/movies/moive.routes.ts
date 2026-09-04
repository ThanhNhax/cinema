import { Router } from "express";
import { movieController } from "./movie.controller";

const route = Router();
route.get("/", movieController.getListMovie);
route.get("/:id", movieController.getMovieById);
route.get("/:id/showtimes", movieController.getShowTimeMovie);
export default route;
