// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import SideNavbar from '../SideNavbar.vue'

describe('SideNav', () => {
  it('renders the correct logo', () => {
    const wrapper = shallowMount(SideNavbar);
    const logo = wrapper.find('h1');
    expect(logo.text()).toBe('mytable');
  });

  it('renders the correct navigation links', () => {
    const wrapper = shallowMount(SideNavbar);
    const links = wrapper.findAll('a');
    expect(links.length).toBe(5);
    expect(links.at(0).text()).toBe('mytable');
    expect(links.at(1).text()).toBe('Overview');
    expect(links.at(2).text()).toBe('Tickets');
    expect(links.at(3).text()).toBe('Tables');
    expect(links.at(4).text()).toBe('Menu');
  });

  it('renders the correct header text', () => {
    const wrapper = shallowMount(SideNavbar);
    const header = wrapper.find('h1');
    expect(header.text()).toBe('mytable');
  });

  it('renders the Overview link', () => {
    const wrapper = shallowMount(SideNavbar);
    const overviewLink = wrapper.find('#overview-link');
    expect(overviewLink.exists()).toBe(true);
  });

  it('renders the Tickets link', () => {
    const wrapper = shallowMount(SideNavbar);
    const ticketsLink = wrapper.find('#tickets-link');
    expect(ticketsLink.exists()).toBe(true);
  });

  it('renders the Tables link', () => {
    const wrapper = shallowMount(SideNavbar);
    const tablesLink = wrapper.find('#tables-link');
    expect(tablesLink.exists()).toBe(true);
  });

  it('renders the Menu link', () => {
    const wrapper = shallowMount(SideNavbar);
    const menuLink = wrapper.find('#menu-link');
    expect(menuLink.exists()).toBe(true);
  });

  it("renders RouterLinks to the correct paths", () => {
    const wrapper = shallowMount(SideNavbar);
    const overviewLink = wrapper.find("#overview-link");
    const ticketsLink = wrapper.find("#tickets-link");
    const tablesLink = wrapper.find("#tables-link");
    const menuLink = wrapper.find("#menu-link");
    expect(overviewLink.attributes().to).toBe("/dashboard/overview");
    expect(ticketsLink.attributes().to).toBe("/dashboard/tickets");
    expect(tablesLink.attributes().to).toBe("/dashboard/tables");
    expect(menuLink.attributes().to).toBe("/dashboard/menu");
  });

});
