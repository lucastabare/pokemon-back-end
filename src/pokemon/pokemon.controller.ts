import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  async findAll() {
    return this.pokemonService.findAll();
  }

  @Post('batalla/:id_pokemon1/:id_pokemon2')
  async batalla(@Param('id_pokemon1') id_pokemon1: string, @Param('id_pokemon2') id_pokemon2: string) {
    return this.pokemonService.batalla(id_pokemon1, id_pokemon2);
  }

  // @Post('create')
  // async create() {
  //   return this.pokemonService.create();
  // }

  @Post('create')
  async create(@Body() pokemonData: Pokemon) {
    return this.pokemonService.create(pokemonData);
  }
}
