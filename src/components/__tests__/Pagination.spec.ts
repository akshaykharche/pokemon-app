import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import Pagination from '../Pagination.vue'

describe('Pagination', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(Pagination, {
        propsData: {
         previousURL: '',
         nextURL: ''
        }
      })
    expect(wrapper.text()).toContain('previous');
    expect(wrapper.text()).toContain('next');
  });
  it('should show previous and next button ', () => {
    const wrapper = shallowMount(Pagination, {
        propsData: {
         previousURL: "",
         nextURL: "dummy"
        }
      })
      const prevButton = wrapper.find('[name="previous-button"]');
      expect(prevButton.exists()).toBe(true);
      const nextButton = wrapper.find('[name="next-button"]');
      expect(nextButton.exists()).toBe(true);
  });
  
})
