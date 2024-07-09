import supertest from "supertest";
import { web } from "../application/web";
import { logger } from "../application/logging";
import { UserTest } from "./test.util";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });
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

  it("should register new user if request is valid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      name: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});
