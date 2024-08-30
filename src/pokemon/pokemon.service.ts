import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';
import { Batalla } from './batalla.entity';
import { pokemonData } from './pokemon.data';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>,
        @InjectRepository(Batalla)
        private batallaRepository: Repository<Batalla>,
    ) { }

    // async create() {
    //     const pokemons = pokemonData.pokemon;

    //     for (const data of pokemons) {
    //         const pokemon = new Pokemon();
    //         Object.assign(pokemon, {
    //             id_pokemon: data.id,
    //             name: data.name,
    //             hp: data.hp,
    //             attack: data.attack,
    //             defense: data.defense,
    //             speed: data.speed,
    //             type: data.type,
    //             imageUrl: data.imageUrl,
    //         });
    //         await this.pokemonRepository.save(pokemon);
    //     }
    // }


    async create(pokemonData: Pokemon) {
        const pokemon = new Pokemon();

        Object.assign(pokemon, {
            id_pokemon: pokemonData.id,
            name: pokemonData.name,
            hp: pokemonData.hp,
            attack: pokemonData.attack,
            defense: pokemonData.defense,
            speed: pokemonData.speed,
            type: pokemonData.type,
            imageUrl: pokemonData.imageUrl,
        });
        return await this.pokemonRepository.save(pokemon);
    }

    async batalla(id_pokemon1: string, id_pokemon2: string) {
        const pokemon1 = await this.pokemonRepository.findOneBy({ id_pokemon: id_pokemon1 });
        const pokemon2 = await this.pokemonRepository.findOneBy({ id_pokemon: id_pokemon2 });

        if (!pokemon1 || !pokemon2) {
            throw new NotFoundException('Pokémon no encontrado');
        }

        let attacker = pokemon1.speed >= pokemon2.speed ? pokemon1 : pokemon2;
        let defender = attacker === pokemon1 ? pokemon2 : pokemon1;

        while (pokemon1.hp > 0 && pokemon2.hp > 0) {
            const damage = Math.max(1, attacker.attack - defender.defense);
            defender.hp -= damage;

            if (defender.hp <= 0) {
                break;
            }

            [attacker, defender] = [defender, attacker];
        }

        const winner = pokemon1.hp > 0 ? pokemon1.name : pokemon2.name;

        const batalla = new Batalla();
        batalla.pokemon1 = pokemon1;
        batalla.pokemon2 = pokemon2;
        batalla.winner = winner;
        await this.batallaRepository.save(batalla);

        return { winner };
    }

    async findAll() {
        return this.pokemonRepository.find();
    }
}
