import supertest from "supertest";
import { web } from "../application/web";
import { logger } from "../application/logging";

describe("POST /api/users", () => {
  it("should be reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      name: "",
      password: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
