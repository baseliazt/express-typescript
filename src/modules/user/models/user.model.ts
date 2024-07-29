import { User } from "@prisma/client";
import { PaginationResponse } from "../../../core/type";

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
  refreshToken?: string;
};

export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};

export type DeleteUserRequest = {
  username: string;
};

export type RefreshTokenUserRequest = {
  refresh_token: string;
};

export type SearchUserRequest = {
  limit?: number;
  offset?: number;
  name?: string;
};

export type SearchUserResponse = {
  data: UserResponse[];
  pagination: PaginationResponse;
};

export type LogoutUserRequest = {};

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
  };
}
