import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UserPokemons from "../entities/userPokemons";

export async function listPokemons(id: number){
    const userPokemons = await getRepository(UserPokemons).find({
        where:{
            userId: id
        }
    });
    const pokemons = await getRepository(Pokemons).find({ relations: ["inMyPokemons"] });

    return pokemons;
}