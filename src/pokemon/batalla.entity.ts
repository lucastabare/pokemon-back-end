import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Batalla {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pokemon)
  pokemon1: Pokemon;

  @ManyToOne(() => Pokemon)
  pokemon2: Pokemon;

  @Column()
  winner: string;
}
