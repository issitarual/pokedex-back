import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UserPokemons from "../entities/userPokemons";

interface AddUser extends Pokemons{
    inMyPokemons: boolean
}

export async function listPokemons(id: number){
    console.log(id)
    const userPokemons = await getRepository(UserPokemons).find({ 
        where: {
          userId: id 
        }
      });
    console.log(userPokemons);
    let pokemons: any[] = await getRepository(Pokemons).find();
    if(userPokemons === []){
        const addUserPokemons = pokemons.map(n => n.inMyPokemons = false);
        console.log(addUserPokemons)
        return addUserPokemons;
    };

    for(let i = 0; i < pokemons.length; i++){
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
    console.log(pokemons)
    return pokemons;
}