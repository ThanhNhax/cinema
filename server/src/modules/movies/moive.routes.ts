import { Router } from "express";
import { getListMovie } from "./movie.controller";

const route = Router();
route.get("/", getListMovie);
export default route;
