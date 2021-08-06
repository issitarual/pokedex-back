import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("userPokemons")
export default class UserPokemons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  pokemonId: number;
}