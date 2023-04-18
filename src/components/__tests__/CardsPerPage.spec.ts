import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import CardsPerPage from '../CardsPerPage.vue';

describe('CardsPerPage', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(CardsPerPage)
    expect(wrapper.text()).toContain('Number of cards');
  });
  
})
