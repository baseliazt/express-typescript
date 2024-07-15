import { Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type";
import { logger } from "../application/logging";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.get("Authorization");
  if (!bearerToken) {
    res.status(401).json({
      errors: "Unauthorized",
    });
    return;
  }
  logger.info(`bearer ${bearerToken}`);
  const token = bearerToken.replace("Bearer ", "");

  if (token) {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });
    logger.info(`user: ${JSON.stringify(user)}`);
    if (user) {
      const secretKey = process.env.JWT_SECRET_KEY ?? "";
      await jwt.verify(token, secretKey, (err: any, jwtUser: any) => {
        if (err) {
          res.status(401).json({
            errors: "Unauthorized",
          });
          return;
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({
        errors: "Unauthorized",
      });
      return;
    }
  }
  res.status(401).json({
    errors: "Unauthorized",
  });
  return;
};
