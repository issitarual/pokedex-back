import { Request, Response } from "express";
import * as pokemonServices from "../services/pokemonServices";

export async function allPokemons(req: Request, res: Response){
    const id: number = res.locals.id;

    const pokemonList = await pokemonServices.listPokemons(id);
    res.send(pokemonList);
}

export async function addPokemons(req: Request, res: Response){
    const userId: number = res.locals.id;
    const pokemonId = req.params.id;

    await pokemonServices.addUserPokemons(userId, parseInt(pokemonId));
    res.sendStatus(200)
}

export async function removePokemons(req: Request, res: Response){
    const userId: number = res.locals.id;
    const pokemonId = req.params.id;

    await pokemonServices.removeUserPokemons(userId, parseInt(pokemonId));
    res.sendStatus(200)
}