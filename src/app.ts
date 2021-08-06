import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import { Request, Response, NextFunction } from "express";

import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonControlers";
import verifyToken from "./middlewares/authMiddlewares";

const app = express();
app.use(cors());
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.sendStatus(500);
});

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.singIn);
app.get("/pokemons", verifyToken, pokemonController.allPokemons);
app.post("/my-pokemons/:id/add", verifyToken, pokemonController.addPokemons);
app.post("/my-pokemons/:id/remove", verifyToken, pokemonController.removePokemons);

export async function init () {
  await connectDatabase();
}

export default app;