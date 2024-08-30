import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  id_pokemon: string;

  @Column()
  name: string;

  @Column()
  hp: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  speed: number;

  @Column()
  type: string;

  @Column()
  imageUrl: string;
}
