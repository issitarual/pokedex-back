import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}