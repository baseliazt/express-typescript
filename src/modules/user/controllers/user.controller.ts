import { Request, Response, NextFunction } from "express";
import {
  CreateUserRequest,
  DeleteUserRequest,
  LoginUserRequest,
  RefreshTokenUserRequest,
  SearchUserRequest,
} from "../models";
import { UserRequest } from "../../../core/type";
import { UserService } from "../services";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.get(req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const updateRequest = req.body;
      const response = await UserService.update(req.user!, updateRequest);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.logout(req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    const deleteRequest: DeleteUserRequest = {
      username: req.params.username,
    };
    try {
      const response = await UserService.delete(deleteRequest);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    const deleteRequest: RefreshTokenUserRequest = {
      refresh_token: String(req.headers["refresh-token"] ?? ""),
    };
    try {
      const response = await UserService.refreshToken(deleteRequest);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      let searchRequest: SearchUserRequest = {};

      const limit = req.query.limit;
      const offset = req.query.offset;
      const name = req.query.name;
      if (limit) {
        searchRequest = {
          ...searchRequest,
          limit: parseInt(String(limit)),
        };
      }

      if (offset) {
        searchRequest = {
          ...searchRequest,
          offset: parseInt(String(offset)),
        };
      }

      if (name) {
        searchRequest = {
          ...searchRequest,
          name: String(name),
        };
      }

      const response = await UserService.search(searchRequest);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
