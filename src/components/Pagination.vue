<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="d-flex justify-content-between">
        <button class="btn btn-link" v-bind:disabled="state.isPreviousButtonDisable" @click="setPrevious">
            previous
        </button>
        <button class="btn btn-link" @click="setNext">next</button>
    </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
    props: ['previousURL', 'nextURL'],

    setup(props, { emit }) {
        const state = reactive({
            isPreviousButtonDisable: props.previousURL
        })

        const setPrevious = () => {
            emit('setPrevious')
            if (props.previousURL) {
                state.isPreviousButtonDisable = false
            } else {
                state.isPreviousButtonDisable = true
            }
        }

        const setNext = () => {
            emit('setNext')
            if (props.previousURL) {
                state.isPreviousButtonDisable = false
            } else {
                state.isPreviousButtonDisable = true
            }
        }

        return {
            state,
            setNext,
            setPrevious
        }
    }
}
</script>
