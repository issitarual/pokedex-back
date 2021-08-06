import supertest from "supertest";
import { getConnection } from "typeorm";
import faker, { fake } from "faker";

import app, { init } from "../../src/app";
import { clearDatabase } from "../utils/database";
import { createUserPokemon, userPokemonsTable } from "../factories/pokemonFactory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

const agent = supertest(app);

describe("GET /pokemons", () => {
    it("should answer with status 401 for invalid token", async () => {
  
      const response = await agent.get("/pokemons").set('Authorization', `Bearer `);
      
      expect(response.status).toBe(401);
    });

    it("should answer with status 401 for invalid token", async () => {
        const token = faker.datatype.uuid();

        const response = await agent.get("/pokemons").set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });

    it("should answer with status 200 for valid params", async () => {
        const token = await createUserPokemon();

        const response = await agent.get("/pokemons").set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                inMyPokemons: false
              })
            ])
          );
    });
  });

  describe("POST /my-pokemons/:id/add", () => {

    it("should answer with status 401 for invalid token", async () => {
  
      const response = await agent.post("/my-pokemons/1/add").set('Authorization', `Bearer `);
      
      expect(response.status).toBe(401);
    });

    it("should answer with status 401 for invalid token", async () => {
        const token = faker.datatype.uuid();

        const response = await agent.post("/my-pokemons/1/add").set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });

     it("should answer with status 200 for valid params", async () => {
        const token = await createUserPokemon();
        const beforeAdd = await userPokemonsTable();

        const response = await agent.post("/my-pokemons/1/add").set('Authorization', `Bearer ${token}`);
        
        const afterAdd = await userPokemonsTable();

        expect(response.status).toBe(200);
        expect(afterAdd - beforeAdd).toBe(1);
    }); 
  });

  describe("POST /my-pokemons/:id/remove", () => {

    it("should answer with status 401 for invalid token", async () => {
  
      const response = await agent.post("/my-pokemons/1/remove").set('Authorization', `Bearer `);
      
      expect(response.status).toBe(401);
    });

    it("should answer with status 401 for invalid token", async () => {
        const token = faker.datatype.uuid();

        const response = await agent.post("/my-pokemons/1/remove").set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });

    it("should answer with status 401 for invalid params", async () => {
      const token = await createUserPokemon();

      const response = await agent.post("/my-pokemons/1/remove").set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(401);
    }); 

    it("should answer with status 200 for valid params", async () => {
      const token = await createUserPokemon();

      await agent.post("/my-pokemons/1/add").set('Authorization', `Bearer ${token}`);

      const beforeRemove = await userPokemonsTable();

      const response = await agent.post("/my-pokemons/1/remove").set('Authorization', `Bearer ${token}`);
      
      const afterRemove = await userPokemonsTable();

      expect(response.status).toBe(200);
      expect(beforeRemove - afterRemove).toBe(1);
    }); 
  });