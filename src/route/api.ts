import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter.get("/api/users/current", UserController.get);
apiRouter.put("/api/users", UserController.update);
apiRouter.delete("/api/users", UserController.logout);
