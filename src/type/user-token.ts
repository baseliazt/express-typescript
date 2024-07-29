import { Request } from "express";
import jwt from "jsonwebtoken";

export interface UserToken {
  username?: string;
}

export type JWTUser = jwt.JwtPayload & {
  username: string;
};

export const setTokenPayload: (data: UserToken) => UserToken = (
  data: UserToken
) => {
  return {
    username: data.username,
  };
};
