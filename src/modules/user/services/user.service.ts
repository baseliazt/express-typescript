import { User } from "@prisma/client";
import { prismaClient } from "../../../core/application/database";
import { ResponseError } from "../../../core/error";
import {
  CreateUserRequest,
  DeleteUserRequest,
  LoginUserRequest,
  RefreshTokenUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../models";
import { UserValidation } from "../validations";
import { Validation } from "../../../core/validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setTokenPayload, UserRequest } from "../../../core/type";

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

    const secretKey = process.env.JWT_SECRET_KEY_TOKEN ?? "";

    const token = await jwt.sign(
      setTokenPayload({ username: user.username }),
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = await jwt.sign(
      setTokenPayload({ username: user.username }),
      secretKey,
      {
        expiresIn: "7d",
      }
    );

    user = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: refreshToken,
      },
    });

    const response = toUserResponse(user);

    response.token = token;
    response.refreshToken = refreshToken;

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

    const response = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return toUserResponse(response);
  }

  static async delete(req: DeleteUserRequest): Promise<UserResponse> {
    const response = await prismaClient.user.delete({
      where: {
        username: req.username,
      },
    });

    return toUserResponse(response);
  }

  static async refreshToken(
    user: User,
    req: RefreshTokenUserRequest
  ): Promise<UserResponse> {
    const secretKey = process.env.JWT_SECRET_KEY_TOKEN ?? "";
    try {
      await jwt.verify(req.refresh_token, secretKey);
      const token = await jwt.sign(
        setTokenPayload({ username: user.username }),
        secretKey,
        {
          expiresIn: "1d",
        }
      );

      const response = await prismaClient.user.update({
        where: {
          username: user.username,
        },
        data: {
          ...user,
          token: token,
        },
      });
      return toUserResponse(response);
    } catch (err) {
      throw new ResponseError(401, "Unauthorized");
    }
  }
}
