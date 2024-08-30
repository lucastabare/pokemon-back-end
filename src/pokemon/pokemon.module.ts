import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { Batalla } from './batalla.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, Batalla])],
  providers: [PokemonService],
  controllers: [PokemonController],
  exports: [PokemonService],
})
export class PokemonModule {}