<template>
    <div class="searchvalue">
        <form @submit.prevent="searchPokemonDetails">
            <input class="form-control" v-model="searchvalue" type="text" placeholder="Search by name or abilities"
                aria-label="search the pokemon" />
        </form>
        <i class="bi bi-search fs-3" @click="searchPokemonDetails"></i>
    </div>
</template>
<script lang="ts">
export default {
    data: () => {
        return {
            searchvalue: ''
        }
    },
    methods: {
        searchPokemonDetails() {
            this.$emit('searchPokemonDetails', this.searchvalue)
        }
    }
}
</script>
<style lang="scss" scoped>
.searchvalue {
    display: flex;
    margin-left: 22px;

    .form-control {
        width: 400px;
        margin-right: 20px;
    }
}
</style>
