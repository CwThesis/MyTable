// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { shallowMount } from '@vue/test-utils'
import Modal from '../AddDishModal.vue'

describe('AddDishModal', () => {
  it('renders the correct content when show prop is true', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        show: true
      }
    });

    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });

  it('renders the correct content when show prop is false', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        show: false
      }
    });

    expect(wrapper.find('.modal-mask').exists()).toBe(false);
  });

  it('emits the correct events when buttons are clicked', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        show: true
      }
    });

    const submitButton = wrapper.find('#submit-button');
    submitButton.trigger('click');
    expect(wrapper.emitted().submit).toBeTruthy();

    const closeButton = wrapper.find('#close-button');
    closeButton.trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
