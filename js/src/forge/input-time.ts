import SlInput from "@shoelace-style/shoelace/dist/components/input/input.js";
import { CSSResultGroup, css } from "lit";
import { makeValueChangeEmitter } from "../make_value_change_emitter";
import {
  CustomElementInputValue,
  makeInputBinding,
} from "../shiny/make-input-binding";

export class ForgeInputTime
  extends SlInput
  implements CustomElementInputValue<string>
{
  static styles: CSSResultGroup = [
    SlInput.styles,
    css`
      .form-control--has-label.form-control--medium .form-control__label {
        margin-bottom: var(--size-xs);
        font-size: var(--font-size-m);
      }
    `,
  ];

  onChangeCallback: (x: boolean) => void = (x: boolean) => {};

  onValueChange = makeValueChangeEmitter(this, this.id);

  constructor() {
    super();
    this.type = "time";
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("input", () => {
      this.notifyChange();
    });

    this.addEventListener("blur", (e) => this.notifyChange());
  }

  notifyChange(): void {
    this.onChangeCallback(true);
    this.onValueChange({ type: "string", value: this.value });
  }
}

customElements.define("forge-input-time", ForgeInputTime);

makeInputBinding("forge-input-time");

declare global {
  interface HTMLElementTagNameMap {
    "forge-input-time": ForgeInputTime;
  }
}
