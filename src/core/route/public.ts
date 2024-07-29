import express from "express";
import { UserController } from "../../modules/user/controllers";

export const publicRouter = express.Router();
publicRouter.post("/api/users", UserController.register);
publicRouter.post("/api/users/login", UserController.login);
