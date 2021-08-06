import supertest from "supertest";
import { getConnection } from "typeorm";
import faker, { fake } from "faker";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";
import { createUserPokemon } from "../factories/pokemonFactory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /pokemons", () => {

    it("should answer with status 401 for inavlid token", async () => {
  
      const response = await supertest(app).get("/pokemons").set('Authorization', `Bearer `);
      
      expect(response.status).toBe(401);
    });

    it("should answer with status 401 for inavlid token", async () => {
        const token = faker.datatype.uuid();

        const response = await supertest(app).get("/pokemons").set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });

    it("should answer with status 200 for valid params", async () => {
        const token = await createUserPokemon();

        const response = await supertest(app).get("/pokemons").set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                inMyPokemons: false
              })
            ])
          );
    });
  
    /* it("should answer with status 400 for invalid e-mail", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();
      await createUser(email, password);
  
      const body = {
        email: faker.internet.email(),
        password: password,
      }
      const response = await supertest(app).post("/sign-in").send(body);
      
      expect(response.status).toBe(400);
    });
  
    it("should answer with status 401 for invalid password", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();
      await createUser(email, password);
  
      const body = {
        email: email,
        password: faker.internet.password(),
      }
      const response = await supertest(app).post("/sign-in").send(body);
      
      expect(response.status).toBe(401);
    });
  
    it("should answer with status 200 for valid params", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();
      await createUser(email, password);
  
      const body = {
        email: email,
        password: password,
      }
      const response = await supertest(app).post("/sign-in").send(body);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        token: response.body.token
      }))
    }); */
  });