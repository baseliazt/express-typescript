import { Response, NextFunction } from "express";
import {
  CreateContactRequest,
  GetContactRequest,
  UpdateContactRequest,
} from "../model";
import { ContactService } from "../service";
import { User } from "@prisma/client";
import { UserRequest } from "../type";
import { logger } from "../application/logging";

export class ContactController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateContactRequest = req.body as CreateContactRequest;
      const user = req.user! as User;
      const response = await ContactService.create(user, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetContactRequest = {
        contactId: Number(req.params?.contactId),
      };
      const user = req.user!;

      const response = await ContactService.get(user, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateContactRequest = {
        ...req.body,
        contactId: Number(req.params?.contactId),
      };
      logger.debug("request.body", request);
      const user = req.user!;

      const response = await ContactService.update(user, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
