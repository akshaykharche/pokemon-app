import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import PokemonDetail from '../PokemonDetail.vue';

describe('PokemonDetail', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(PokemonDetail)
    expect(wrapper.text()).toContain("Pokemon's Details");
    expect(wrapper.text()).toContain("Go back");
    expect(wrapper.text()).toContain("Weight");
    expect(wrapper.text()).toContain("Height");
    expect(wrapper.text()).toContain("Base Experience");
    expect(wrapper.text()).toContain("Abilities");
    expect(wrapper.text()).toContain("Pokemon Types");
  });
  
})
