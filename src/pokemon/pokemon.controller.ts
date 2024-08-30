import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';
import { Messages } from 'src/enum/messagesEnum';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  async findAll() {
    try {
      const result = await this.pokemonService.findAll();
      return { message: Messages.SUCCESS_FIND_ALL, data: result };
    } catch (error) {
      throw new HttpException(Messages.ERROR_FIND_ALL, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('batalla/:id_pokemon1/:id_pokemon2')
  async batalla(@Param('id_pokemon1') id_pokemon1: string, @Param('id_pokemon2') id_pokemon2: string) {
    try {
      const result = await this.pokemonService.batalla(id_pokemon1, id_pokemon2);
      return { message: Messages.SUCCESS_BATTLE, data: result };
    } catch (error) {
      throw new HttpException(Messages.ERROR_BATTLE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Post('create')
  // async create() {
  //   return this.pokemonService.create();
  // }

  async create(@Body() pokemonData: Pokemon) {
    try {
      const result = await this.pokemonService.create(pokemonData);
      return { message: Messages.SUCCESS_CREATE, data: result };
    } catch (error) {
      throw new HttpException(Messages.ERROR_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
