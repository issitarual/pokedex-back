import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UserPokemons from "../entities/userPokemons";

interface AddUser extends Pokemons{
    inMyPokemons: boolean
}

export async function listPokemons(id: number){
    const userPokemons = await getRepository(UserPokemons).find({
        where:{
            userId: id
        }
    });
    let pokemons: any[] = await getRepository(Pokemons).find();
    if(!userPokemons){
        return pokemons.map(n => n["inMyPokemons"] = false)
    };

    for(let i = 0; i < pokemons.length; i++){
        const pokemonId = pokemons[i].id;
        for(let j = 0; j < userPokemons.length; j++){
            if(userPokemons[j].pokemonId === pokemonId){
                pokemons[i]["inMyPokemons"] = true;
            }
            else{
                pokemons[i]["inMyPokemons"] = false;
            }
        }
    }
    return pokemons;
}