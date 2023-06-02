import { SlSwitch } from "@shoelace-style/shoelace";
import { CSSResultGroup, css } from "lit";
import { make_input_binding } from "../make_input_binding";
import { make_value_change_emitter } from "../make_value_change_emitter";

export class ForgeInputSwitch extends SlSwitch {
  inline: boolean = false;

  // Make slider the same size as the "slot".
  static styles: CSSResultGroup = [
    SlSwitch.styles,
    css`
      :host([size="small"]) {
        --thumb-size: var(--sl-toggle-size-small);
      }
      :host([size="medium"]) {
        --thumb-size: var(--sl-toggle-size-medium);
      }
      :host([size="large"]) {
        --thumb-size: var(--sl-toggle-size-large);
      }
    `,
  ];

  onChangeCallback: (x: boolean) => void = (x: boolean) => {};

  on_value_change = make_value_change_emitter(this, this.id);

  connectedCallback() {
    super.connectedCallback();
    // Interpret the presence of a value attribute as "checked"
    if (this.value !== undefined) {
      this.checked = true;
    }
    if (!this.inline) {
      this.style.display = "block";
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("checked")) {
      this.onChangeCallback(true);
      this.on_value_change({ type: "boolean", value: this.checked });
    }
  }
}

customElements.define("forge-input-switch", ForgeInputSwitch);

make_input_binding("forge-input-switch", "checked");