import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { ContactController, UserController } from "../controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter.get("/api/users/current", UserController.get);
apiRouter.put("/api/users", UserController.update);
apiRouter.delete("/api/users", UserController.logout);

apiRouter.post("/api/contacts", ContactController.create);
apiRouter.get("/api/contacts/:contactId", ContactController.get);
