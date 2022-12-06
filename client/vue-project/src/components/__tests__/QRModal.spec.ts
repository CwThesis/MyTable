// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { shallowMount } from '@vue/test-utils';
import QRModal from './../QRModal.vue';

const wrapper = shallowMount(QRModal, {
  propsData: {
    show: true,
  },
  slots: {
    header: '<div class="modal-header-content"></div>',
    body: '<div class="modal-body-content"></div>',
  },
});

describe('QRModal', () => {
  it('renders the header slot content in the header section', () => {
    const modalHeader = wrapper.find('.modal-header');
    expect(modalHeader.find('.modal-header-content').exists()).toBe(true);
  });

  it('renders the body slot content in the body section', () => {
    const modalBody = wrapper.find('.modal-body');
    expect(modalBody.find('.modal-body-content').exists()).toBe(true);
  });

  it('emits a "submit" event when the submit button is clicked', () => {
    const submitButton = wrapper.find('#submit-button');
    submitButton.trigger('click');
    expect(wrapper.emitted().submit).toBeTruthy();
  });

  it('emits a "close" event when the close button is clicked', () => {
    const closeButton = wrapper.find('#close-button');
    closeButton.trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
