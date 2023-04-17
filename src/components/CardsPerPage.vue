<template>
    <select class="form-select" aria-label="Select the number of cards" v-model="paginationValue" @change="setCardsPerPage">
        <option selected value="0">Number of cards</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">30</option>
    </select>
</template>

<script lang="ts">
export default {
    data: () => {
        return {
            paginationValue: '0'
        }
    },
    methods: {
        setCardsPerPage() {
            this.$emit('setCardsPerPage', this.paginationValue)
        }
    }
}
</script>
