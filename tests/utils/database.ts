import { getRepository } from "typeorm";

import Session from "../../src/entities/Session";
import User from "../../src/entities/User";
import UserPokemons from "../../src/entities/userPokemons";

export async function clearDatabase () {
  await getRepository(UserPokemons).delete({});
  await getRepository(Session).delete({});
  await getRepository(User).delete({});
}
