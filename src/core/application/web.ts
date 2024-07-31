import express from "express";
import { apiRouter, publicRouter } from "../route";
import { errorMiddleware } from "../middleware";
import swaggerUi from "swagger-ui-express";
import mergedSwagger from "./mergedSwagger";

export const web = express();

web.use("/docs", swaggerUi.serve, swaggerUi.setup(mergedSwagger));

web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);
web.use(apiRouter);
