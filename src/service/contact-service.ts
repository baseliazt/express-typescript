import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  ContactResponse,
  CreateContactRequest,
  GetContactRequest,
  toContactResponse,
  UpdateContactRequest,
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
  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    const updateRequest = Validation.validate(
      ContactValidation.UPDATE,
      request
    );

    const contact = await prismaClient.contact.findUnique({
      where: {
        id: request.contactId,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact Not Found");
    }

    if (updateRequest.first_name) {
      contact.first_name = updateRequest.first_name;
    }

    if (updateRequest.last_name) {
      contact.last_name = updateRequest.last_name;
    }

    if (updateRequest.email) {
      contact.email = updateRequest.email;
    }

    if (updateRequest.phone) {
      contact.phone = updateRequest.phone;
    }

    const response = await prismaClient.contact.update({
      where: {
        username: user.username,
        id: updateRequest.contactId,
      },
      data: {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
      },
    });

    return toContactResponse(response);
  }
  static async delete(
    user: User,
    request: GetContactRequest
  ): Promise<ContactResponse> {
    const getRequest = request;
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: getRequest.contactId,
        username: user.username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact Not Found");
    }

    const response = await prismaClient.contact.delete({
      where: {
        id: getRequest.contactId,
      },
    });

    return toContactResponse(response);
  }
}
