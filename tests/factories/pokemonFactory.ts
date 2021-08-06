import { getRepository } from "typeorm";
import faker from "faker";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";
import { createUser } from "./userFactory";
import UserPokemons from "../../src/entities/userPokemons";

export async function createUserPokemon() {
    const token = faker.datatype.uuid();
    const password = faker.internet.password();
    const email = faker.internet.email();

    await createUser(email, password);

    const user = await getRepository(User).findOne({where: {email: email}});

    await getRepository(Session).insert({
        userId: user.id,
        token: token
    });

    return token;
}

export async function userPokemonsTable() {
    const user = await getRepository(UserPokemons).find();

    return user.length;
}