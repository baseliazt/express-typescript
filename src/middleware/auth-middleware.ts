import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type";
import { ResponseError } from "../error";
import { logger } from "../application/logging";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("X-API-TOKEN");

  if (token) {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });
    logger.debug("test", user);

    if (user) {
      req.user = user;
      next();
      return;
    } else {
      res.status(401).json({
        errors: "Unauthorized",
      });
    }
  }
  res.status(401).json({
    errors: "Unauthorized",
  });
};
