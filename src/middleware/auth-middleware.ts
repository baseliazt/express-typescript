import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type";
import { ResponseError } from "../error";
import { logger } from "../application/logging";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("X-API-TOKEN");

  if (token) {
    // const user = await prismaClient.user.findFirst({
    //   where: {
    //     token: token,
    //   },
    // });

    // if (user) {
    const secretKey = process.env.JWT_SECRET_KEY ?? "";
    await jwt.verify(token, secretKey, (err: any, jwtUser: any) => {
      if (err) {
        res.status(401).json({
          errors: "Unauthorized token",
        });
        return;
      }
      req.user = jwtUser as NonNullable<User>;
      next();
    });
    // } else {
    //   res.status(401).json({
    //     errors: "Unauthorized",
    //   });
    // }
  }
  res.status(401).json({
    errors: "Unauthorized",
  });
};
