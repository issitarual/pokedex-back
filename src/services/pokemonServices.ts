import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UserPokemons from "../entities/userPokemons";

interface AddUser extends Pokemons{
    inMyPokemons: boolean
}

export async function listPokemons(id: number){
    const userPokemons = await getRepository(UserPokemons).find({ 
        where: {
          userId: id 
        }
      });
    let pokemons: any[] = await getRepository(Pokemons).find();

    for(let i = 0; i < pokemons.length; i++){
        if(!userPokemons[0]){
            pokemons[i].inMyPokemons = false;
        }
        else{
            const pokemonId = pokemons[i].id;
            for(let j = 0; j < userPokemons.length; j++){
                if(userPokemons[j].pokemonId === pokemonId){
                    pokemons[i].inMyPokemons = true;
                }
                else{
                    pokemons[i].inMyPokemons = false;
                }
            }
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

    await getRepository(UserPokemons).delete({id: pokemon.id})
}