import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";

export async function listPokemons(id: number){
    const pokemons = await getRepository(Pokemons).find();
    return pokemons;
}