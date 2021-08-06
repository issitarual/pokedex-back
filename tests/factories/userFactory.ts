import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import bcrypt from "bcrypt";

export async function createUser (email: string, password: string) {
  await getRepository(User).insert({
    email: email,
    password: bcrypt.hashSync(password, 12)
  });
}
