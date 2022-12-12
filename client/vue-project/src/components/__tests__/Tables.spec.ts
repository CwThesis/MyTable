// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { shallowMount } from '@vue/test-utils'
import TablesSearch from '../Tables/TablesSearch.vue'
import ModalView from '../ModalView.vue';

describe('TablesSearch', () => {
  it("doesn't render the TableGrid component when userData prop is null", () => {
    const wrapper = shallowMount(TablesSearch as any, {
      propsData: {
        userData: null
      }
    });
    expect(wrapper.find('#TableGrid').exists()).toBe(false);
  });
});

describe('ModalView', () => {
  it('renders the correct content when show prop is true', () => {
    const wrapper = shallowMount(ModalView, {
      propsData: {
        show: true
      }
    });

    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });

  it('renders the correct content when show prop is false', () => {
    const wrapper = shallowMount(ModalView, {
      propsData: {
        show: false
      }
    });

    expect(wrapper.find('.modal-mask').exists()).toBe(false);
  });

});