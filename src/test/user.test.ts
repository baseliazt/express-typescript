import supertest from "supertest";
import { web } from "../application/web";
import { logger } from "../application/logging";
import { UserTest } from "./test.util";

// describe("POST /api/users", () => {
//   afterEach(async () => {
//     await UserTest.delete();
//   });
//   it("should be reject register new user if request is invalid", async () => {
//     const response = await supertest(web).post("/api/users").send({
//       username: "",
//       name: "",
//       password: "",
//     });

//     logger.debug(response.body);
//     expect(response.status).toBe(400);
//     expect(response.body.errors).toBeDefined();
//   });

//   it("should register new user if request is valid", async () => {
//     const response = await supertest(web).post("/api/users").send({
//       username: "test",
//       name: "test",
//       password: "test",
//     });

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.username).toBe("test");
//     expect(response.body.data.name).toBe("test");
//   });
// });

describe("POST /api/users/login", () => {
//   beforeEach(async () => {
//     await UserTest.create();
//   });

//   afterEach(async () => {
//     await UserTest.delete();
//   });

  it("should be able to login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "milyasbpa",
      password: "m@G3L4NG",
    });

    logger.debug(response.body);
    // expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("milyasbpa");
    // expect(response.body.data.username).toBe("test");
    // expect(response.body.data.token).toBeDefined();
  });

//   it("should reject login if username is wrong", async () => {
//     const response = await supertest(web).post("/api/users/login").send({
//       username: "salah",
//       password: "test",
//     });

//     logger.debug(response.body);
//     expect(response.status).toBe(401);
//     expect(response.body.errors).toBeDefined();
//   });

//   it("should reject login if password is wrong", async () => {
//     const response = await supertest(web).post("/api/users/login").send({
//       username: "test",
//       password: "salah",
//     });

//     logger.debug(response.body);
//     expect(response.status).toBe(401);
//     expect(response.body.errors).toBeDefined();
//   });
});
