import express from "express";
import { apiRouter, publicRouter } from "../route";
import { errorMiddleware } from "../middleware";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);
web.use(apiRouter);
