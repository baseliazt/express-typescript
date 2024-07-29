import jwt from "jsonwebtoken";
import { JWTUser, UserToken } from "../type";

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET_KEY_TOKEN ?? "";
const ACCESS_REFRESH_TOKEN_SECRET =
  process.env.JWT_SECRET_KEY_REFRESH_TOKEN ?? "";
const EXPIRES_IN = "15m";

export const setTokenPayload: (data: UserToken) => UserToken = (
  data: UserToken
) => {
  return {
    username: data.username,
  };
};

export const generateAccessToken = async (user: UserToken) => {
  return await jwt.sign(
    setTokenPayload({ username: user.username }),
    ACCESS_TOKEN_SECRET,
    { expiresIn: EXPIRES_IN }
  );
};

export const verifyAccessToken = async (data: { token: string }) => {
  return (await jwt.verify(data.token, ACCESS_TOKEN_SECRET)) as JWTUser;
};

export const generateAccessRefreshToken = async (user: UserToken) => {
  return await jwt.sign(
    setTokenPayload({ username: user.username }),
    ACCESS_REFRESH_TOKEN_SECRET,
    { expiresIn: EXPIRES_IN }
  );
};

export const verifyAccessRefreshToken = async (data: { token: string }) => {
  return (await jwt.verify(data.token, ACCESS_REFRESH_TOKEN_SECRET)) as JWTUser;
};
