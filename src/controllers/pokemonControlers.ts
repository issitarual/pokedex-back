import { NextFunction, Request, Response } from "express";
import * as pokemonServices from "../services/pokemonServices";

export async function allPokemons(req: Request, res: Response, next: NextFunction){
    const id: number = res.locals.id;

    try{
        const pokemonList = await pokemonServices.listPokemons(id);

        res.send(pokemonList);
    }
    catch(e){
        next(e);
    }
}

export async function addPokemons(req: Request, res: Response, next: NextFunction){
    const userId: number = res.locals.id;
    const pokemonId = req.params.id;

    try{
        await pokemonServices.addUserPokemons(userId, parseInt(pokemonId));
        
        res.sendStatus(200);
    }
    catch(e){
        next(e);
    }
}

export async function removePokemons(req: Request, res: Response, next: NextFunction){
    const userId: number = res.locals.id;
    const pokemonId = req.params.id;

    try{
        const findPokemon = await pokemonServices.removeUserPokemons(userId, parseInt(pokemonId));
        if(!findPokemon) return res.sendStatus(401);
        
        res.sendStatus(200);
    }
    catch(e){
        next(e);
    }
}