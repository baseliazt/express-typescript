import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";

import { UserController } from "../../modules/user/controllers";
import { ContactController } from "../../modules/contact/controllers";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users", UserController.update);
apiRouter.delete("/api/users/logout", UserController.logout);
apiRouter.delete("/api/users/:username", UserController.delete);
apiRouter.get("/api/users/search", UserController.search);

apiRouter.post("/api/contacts", ContactController.create);
apiRouter.get("/api/contacts/:contactId", ContactController.get);
apiRouter.put("/api/contacts/:contactId", ContactController.update);
