import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import UserPokemons from "./userPokemons";

@Entity("pokemons")
export default class Pokemons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  image: string;

  @Column()
  weight: number

  @Column()
  height: number

  @Column()
  baseExp: number

  @Column()
  description: string

  @OneToMany(() => UserPokemons, userPokemons => userPokemons.userPokemons)
  inMyPokemons: Pokemons[];
}