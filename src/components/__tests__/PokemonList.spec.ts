import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PokemonList from '../PokemonList.vue'

describe('PokemonList', () => {
  it('renders properly', () => {
    const wrapper = mount(PokemonList)
    expect(wrapper.text()).toContain('previous');
    expect(wrapper.text()).toContain('next');
    expect(wrapper.text()).toContain('Number of cards');
  })
})
