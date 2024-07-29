import { Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type";
import { verifyAccessToken } from "../utils/jwt";

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
    try {
      const jwtUser = await verifyAccessToken({ token: token });
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
