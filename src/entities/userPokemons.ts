import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("usePokemons")
export default class UserPokemons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  pokemonId: number;
}