import express from "express";
import { UserController } from "../controller";

export const publicRouter = express.Router();
publicRouter.post("/api/users", UserController.register);
