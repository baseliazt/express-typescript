import { Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type";
import jwt from "jsonwebtoken";
import { JWTUser } from "../type";

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
  if (!bearerToken.includes("Bearer ")) {
    res.status(401).json({
      errors: "Unauthorized",
    });
    return;
  }

  const token = bearerToken.replace("Bearer ", "");

  if (token) {
    let username: string = "";
    const secretKey = process.env.JWT_SECRET_KEY_TOKEN ?? "";
    try {
      const jwtUser = (await jwt.verify(token, secretKey)) as JWTUser;
      username = jwtUser.username;
    } catch (err) {
      return res.status(401).json({
        errors: "Unauthorized",
      });
    }

    try {
      const user = await prismaClient.user.findFirst({
        where: {
          username: username,
        },
      });
      console.log("ini user", user);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          errors: "Unauthorized",
        });
      }
    } catch (err) {
      return res.status(401).json({
        errors: "Unauthorized",
      });
    }
  } else {
    res.status(401).json({
      errors: "Unauthorized",
    });
    return;
  }
};
