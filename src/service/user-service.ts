import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error";
import {
  CreateUserRequest,
  DeleteUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model";
import { UserValidation } from "../validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import jwt from "jsonwebtoken";
import { logger } from "../application/logging";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserWithSameUsername !== 0) {
      throw new ResponseError(400, "Username is exist");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const secretKey = process.env.JWT_SECRET_KEY ?? "";

    const token = await jwt.sign(user, secretKey, {
      expiresIn: "1m",
    });
    logger.info(`token: ${token.length}`);

    const response = toUserResponse(user);
    response.token = token;
    return response;
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const response = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        name: user.name,
        password: user.password,
      },
    });

    return toUserResponse(response);
  }

  static async logout(user: User): Promise<UserResponse> {
    const logoutUser = await prismaClient.user.findFirst({
      where: {
        username: user.username,
      },
    });
    if (!logoutUser) {
      throw new ResponseError(404, "User Not Found");
    }

    return toUserResponse(logoutUser);
  }

  static async delete(req: DeleteUserRequest): Promise<UserResponse> {
    const response = await prismaClient.user.delete({
      where: {
        username: req.username,
      },
    });

    return toUserResponse(response);
  }
}
