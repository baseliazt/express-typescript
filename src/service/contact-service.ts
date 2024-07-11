import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  ContactResponse,
  CreateContactRequest,
  GetContactRequest,
  toContactResponse,
} from "../model";
import { ContactValidation } from "../validation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    const response = await prismaClient.contact.create({
      data: {
        username: user.username,
        first_name: createRequest.first_name,
        last_name: createRequest.last_name,
        email: createRequest.email,
        phone: createRequest.phone,
      },
    });

    return toContactResponse(response);
  }

  static async get(
    user: User,
    request: GetContactRequest
  ): Promise<ContactResponse> {
    const getRequest = request;
    const response = await prismaClient.contact.findFirst({
      where: {
        id: getRequest.contactId,
        username: user.username,
      },
    });

    if (!response) {
      throw new ResponseError(404, "Contact Not Found");
    }

    return toContactResponse(response);
  }
}
