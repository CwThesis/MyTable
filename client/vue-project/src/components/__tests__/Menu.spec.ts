// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import MenuView from '../Menu/MenuView.vue'
import { render, screen, waitFor } from '@testing-library/vue';


describe('MenuView', () => {
  it('renders the banner property as expected', async () => {
    // Render the component
    render(MenuView);

    await waitFor(() => screen.getByTestId('banner'));
    // Select the banner element
    const bannerElement = screen.getByTestId('banner');

    // Assert that the banner has the expected title
    expect(bannerElement.getAttribute('title')).toEqual('');
  });
});