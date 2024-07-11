import { Response, NextFunction } from "express";
import { CreateContactRequest } from "../model";
import { ContactService } from "../service";
import { User } from "@prisma/client";
import { UserRequest } from "../type";

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
}
