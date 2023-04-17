<script lang="ts">
import { reactive, onMounted } from 'vue'
import PokemonSearch from './PokemonSearch.vue'
import CardsPerPage from './CardsPerPage.vue'
import Pagination from './Pagination.vue'

export default {
    setup() {
        const state = reactive({
            pokemonList: [] as never[],
            filteredPokemonList: [],
            pageNumbers: [],
            imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
            nextURL: '',
            previousURL: ''
        })

        onMounted(() => {
            fetchPokemons(20, 0)
        })

        const fetchPokemons = (limit?: number, offset?: number, url?: string) => {
            let pokemonURL = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
            if (url) {
                pokemonURL = url
            }
            fetch(pokemonURL)
                .then((response) => {
                    if (response.status === 200) return response.json()
                })
                .then((response) => {
                    response.results.forEach(async (pokemon: { url: string }) => {
                        const { url } = pokemon
                        const properURL = url.split('/').filter((val: string | number) => !!val)
                        const id = Number(properURL.pop())
                        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                            .then((response) => {
                                if (response.status === 200) return response.json()
                            })
                            .then((pokemonResponse) => {
                                const pokemonObj = {
                                    ...pokemon,
                                    id,
                                    weight: pokemonResponse.weight,
                                    height: pokemonResponse.height,
                                    abilities: pokemonResponse.abilities
                                } as any | never
                                state.pokemonList.push(pokemonObj);
                                state.filteredPokemonList.push(pokemonObj);
                            })
                    })
                    state.nextURL = response.next
                    state.previousURL = response.previous
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        const searchPokemonDetails = (searchValue: any) => {
            if (searchValue === '') {
                state.filteredPokemonList = state.pokemonList
            } else {
                const listOfPokemons = state.pokemonList.filter((event: any) => {
                    const isNameMatched = event.name?.toLowerCase() === searchValue.toLowerCase()
                    const isAbilityMatched = event.abilities
                        .map((val: { ability: { name: any } }) => val.ability.name)
                        .some((ability: string) => ability?.toLowerCase() === searchValue.toLowerCase())
                    return isNameMatched || isAbilityMatched
                })

                state.filteredPokemonList = listOfPokemons
            }
        }

        const setCardsPerPage = (paginationValue: any) => {
            state.filteredPokemonList = []
            fetchPokemons(paginationValue, 0)
        }

        const setNext = () => {
            state.filteredPokemonList = []
            fetchPokemons(20, 0, state.nextURL)
        }

        const setPrevious = () => {
            state.filteredPokemonList = []
            fetchPokemons(20, 0, state.previousURL)
        }

        return {
            state,
            searchPokemonDetails,
            setCardsPerPage,
            setNext,
            setPrevious
        }
    },
    components: {
        PokemonSearch,
        CardsPerPage,
        Pagination
    }
}
</script>
<template>
    <div class="d-flex justify-content-md-between">
        <PokemonSearch @searchPokemonDetails="searchPokemonDetails" />
        <Pagination :previousURL="state.previousURL" :nextURL="state.nextURL" @setPrevious="setPrevious"
            @setNext="setNext" />
    </div>

    <div class="d-flex flex-wrap">
        <div class="card" v-for="pokemon in state.filteredPokemonList" :key="pokemon['name']"
            @click="$router.push({ name: 'details', params: { id: pokemon['id'] } })">
            <div class="d-flex flex-column align-items-center">
                <img :src="state.imageUrl + pokemon['id'] + '.png'" width="200" height="150" :alt="pokemon['name']" />
                <h5 class="card-title">{{ pokemon['name'] }}</h5>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-md-between">
                    <strong>Height</strong>
                    <div>{{ pokemon['height'] }}</div>
                </div>
                <div class="d-flex justify-content-between">
                    <strong>Weight</strong>
                    <div>{{ pokemon['weight'] }}</div>
                </div>
                <strong>Abilities</strong>
                <ul>
                    <li v-for="(value, index) in pokemon['abilities']" :key="'value' + index">
                        {{ value['ability']?.['name'] }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-md-between">
        <CardsPerPage @setCardsPerPage="setCardsPerPage" />
        <Pagination :previousURL="state.previousURL" :nextURL="state.nextURL" @setPrevious="setPrevious"
            @setNext="setNext" />
    </div>
</template>

<style lang="scss" scoped>
.card {
    padding: 20px;
    margin: 20px;
    background-color: #efefef;
    width: 25%;
    cursor: pointer;

    .card-title {
        text-transform: capitalize;
    }
}
</style>
