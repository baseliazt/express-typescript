import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model";
import { ContactValidation } from "../validation";
import { Validation } from "../validation/validation";

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
}
