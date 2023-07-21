import type { Meta, StoryObj } from "@storybook/web-components";

import { html } from "lit";
import { Container } from "../container";
import { OutputPlot } from "../output_plot";

Container;
OutputPlot;

const meta: Meta = {
  component: "sc-container",
  decorators: [
    (story) =>
      html`<div
        style="padding: var(--size-7); outline:1px solid black; max-width:450px;height:550px;"
      >
        ${story()}
      </div>`,
  ],
};
export default meta;

type Story = StoryObj;

export const primary: Story = {
  render: () => html`<sc-container>
    <h2>Foo</h2>
    <output-plot> </output-plot>
  </sc-container>`,
};

export const b: Story = {
  render: () => html`<sc-container>
    <sc-header> I am a header </sc-header>
    <output-plot height="300"> </output-plot>
  </sc-container>`,
};

export const c: Story = {
  render: () => html`<sc-container nofill>
    <sc-header> I am a header </sc-header>
    <output-plot> </output-plot>
    <sc-footer> I am a footer </sc-footer>
  </sc-container>`,
};

export const d: Story = {
  render: () => html`<sc-container>
    <sc-header> I am a header </sc-header>
    <output-plot height="250"> </output-plot>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <output-plot height="350"> </output-plot>
    <sc-footer> I am a footer </sc-footer>
  </sc-container>`,
};
