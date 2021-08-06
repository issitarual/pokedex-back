import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UserPokemons from "../entities/userPokemons";

export async function listPokemons(id: number){
    const userPokemons = await getRepository(UserPokemons).find({ 
        where: {
          userId: id 
        }
      });
    let pokemons: any[] = await getRepository(Pokemons).find({
        order: {
            number: 'ASC'
        }
    });
    
    const pokemonsPassed: any = {};
    if(userPokemons[0]){
        for(let i = 0; i < userPokemons.length; i++){
            const pokemonId = userPokemons[i].pokemonId;
            pokemonsPassed.pokemonId = true;
        }
    }

    for(let j = 0; j < pokemons.length; j++){
        const pokemonId = pokemons[j].id;
        if(pokemonsPassed.pokemonId){
            pokemons[j].inMyPokemons = true;
        }
        else{
            pokemons[j].inMyPokemons = false;
        }
    }

    return pokemons;
}

export async function addUserPokemons(userId: number, pokemonId: number){
    await getRepository(UserPokemons).insert({
        userId: userId,
        pokemonId: pokemonId
    });
}

export async function removeUserPokemons(userId: number, pokemonId: number){
    const userPokemons = await getRepository(UserPokemons).find({ 
        where: {
          userId: userId 
        }
    });

    const pokemon = userPokemons.find(n => n.pokemonId === pokemonId);

    if(!pokemon) return false;

    await getRepository(UserPokemons).delete({id: pokemon.id})

    return true;
}