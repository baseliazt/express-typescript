import { Request } from "express";

export interface UserToken {
  username?: string;
}

export const setTokenPayload: (data: UserToken) => UserToken = (
  data: UserToken
) => {
  return {
    username: data.username,
  };
};
