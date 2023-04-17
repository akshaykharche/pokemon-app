<template>
    <button class="btn btn-primary" @click="$router.push({ name: 'home' })">Go back</button>
    <div class="card">
        <h5 class="p-4 text-center">Pokemon's Details</h5>
        <div class="d-flex flex-column align-items-center">
            <img :src="state.imageUrl + state.pokemonList.id + '.png'" width="200" height="200"
                :alt="state.pokemonList.name" />
            <h5 class="card-title">{{ state.pokemonList.name }}</h5>
        </div>
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <strong>ID</strong>
                <div>{{ state.pokemonList.id }}</div>
            </div>

            <div class="d-flex justify-content-between">
                <strong>Height</strong>
                <div>{{ state.pokemonList.height }}</div>
            </div>

            <div class="d-flex justify-content-between">
                <strong>Weight</strong>
                <div>{{ state.pokemonList.weight }}</div>
            </div>

            <div class="d-flex justify-content-between">
                <strong>Base Experience</strong>
                <div>{{ state.pokemonList.base_experience }}</div>
            </div>

            <strong>Abilities</strong>
            <ul>
                <li v-for="(value, index) in state.pokemonList.abilities" :key="'value' + index">
                    {{ value.ability.name }}
                </li>
            </ul>

            <strong>Pokemon Types</strong>
            <ul>
                <li class="type" v-for="(value, index) in state.pokemonList.types" :key="'value' + index">
                    {{ value.type.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
    setup() {
        const state = reactive({
            pokemonList: [] as any,
            imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
        })

        onMounted(() => {
            fetchPokemon()
        })

        const fetchPokemon = () => {
            const currentRoute = useRoute()
            let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${currentRoute?.params.id}`

            fetch(pokemonURL)
                .then((response) => {
                    if (response.status === 200) return response.json()
                })
                .then((response) => {
                    state.pokemonList = response
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        return {
            state
        }
    },
    name: 'PokemonDetail'
}
</script>

<style lang="scss" scoped>
.card {
    width: 30%;
    margin: auto;
}
</style>
