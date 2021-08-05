import supertest from "supertest";
import { getConnection } from "typeorm";
import faker, { fake } from "faker";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {

  it("should answer with status 400 for inavlid params", async () => {

    const response = await supertest(app).post("/sign-up").send({});
    
    expect(response.status).toBe(400);
  });

  it("should answer with status 400 for wrong passwords", async () => {
    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      confirmPassword: faker.internet.password()
    }
    const response = await supertest(app).post("/sign-up").send(body);
    
    expect(response.status).toBe(400);
  });

  it("should answer with status 400 for wrong e-mail", async () => {
    const password = faker.internet.password()
    const body = {
      email: faker.datatype.string(),
      password: password,
      confirmPassword: password
    }
    const response = await supertest(app).post("/sign-up").send(body);
    
    expect(response.status).toBe(400);
  });

  it("should answer with status 409 for repeated e-mail", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    await createUser(email, password);

    const body = {
      email: email,
      password: password,
      confirmPassword: password
    }
    const response = await supertest(app).post("/sign-up").send(body);
    
    expect(response.status).toBe(409);
  });

  it("should answer with status 201 for valid params", async () => {
    const password = faker.internet.password();

    const body = {
      email: faker.internet.email(),
      password: password,
      confirmPassword: password
    }
    const response = await supertest(app).post("/sign-up").send(body);
    
    expect(response.status).toBe(201);
  });
});
