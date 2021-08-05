import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pokemons from "./Pokemons";

@Entity("userPokemons")
export default class UserPokemons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  pokemonId: number;

  @ManyToOne(() => Pokemons, pokemon => pokemon.inMyPokemons)
  userPokemons: UserPokemons;
}