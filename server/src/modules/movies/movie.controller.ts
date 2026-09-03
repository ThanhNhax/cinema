import { Request, Response } from "express";

const getListMovie = async (req: Request, res: Response) => {
    await res.status(200).json({ message: "hello list movie." });
};


export {getListMovie}