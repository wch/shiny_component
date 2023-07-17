import Color from "colorjs.io";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("value-box")
export class ValueBox extends LitElement {
  @property({ reflect: true }) value: string = "";

  /**
   * Background color for the box. Default value is `"brand"`, which is the
   * brand color defined in your current theme. Other options are any of the
   * [color roots defined in open-props](https://open-props.style/#colors) (e.g.
   * `"red"`, `"pink"`, `"jungle"`, ...), a css-variable (e.g.
   * `"var(--my-color)"`), or a hex color (e.g. `"#ff0000"`). If no text color
   * is provided, light or dark text will be chosen based on the best contrast.
   */
  @property({ type: String }) bg: string = "brand";

  @property({ type: String }) textColor: string = "";

  /**
   * The name of the icon to display using iconify format. For list of all
   * available icons, see: https://icon-sets.iconify.design/
   * @property {string} icon
   * @default "gg:chart"
   */
  @property({ type: String }) icon: string = "gg:chart";
  @property({ type: String }) title: string = "";
  @property({ type: String }) subtitle: string = "";
  @property({ type: String }) subvalue: string = "";

  static lightText = "#f1f3f5";
  static darkText = "#212529";

  static styles = [
    css`
      :host {
        --bg-color: var(--surface-1);
        --text-color: var(--text-1);

        height: 100%;
        max-height: 200px;
        min-height: 100px;
        max-width: 400px;
        background-color: var(--bg-color);
        color: var(--text-color);
        padding: var(--size-m);
        border-radius: var(--radius-m);
        box-shadow: var(--shadow-m);
        display: grid;
        gap: var(--size-s);
        grid-template-areas:
          "title icon"
          "value icon";

        /* TODO: Deal with this eventually */
        overflow: hidden;
      }

      .title {
        grid-area: title;
      }

      .title .main {
        font-size: var(--font-size-l);
        font-weight: var(--font-weight-bold);
      }

      .value {
        grid-area: value;
      }

      .value .main {
        font-size: var(--font-size-h1);
        font-family: var(--font-mono);
      }

      .subvalue {
        margin-top: calc(-1 * var(--size-xs));
      }

      .subtitle,
      .subvalue {
        font-size: var(--font-size-m);
        opacity: 0.8;
        font-style: italic;
      }

      .icon {
        grid-area: icon;
        font-size: var(--size-xl);
        display: grid;
        place-content: center;
      }
    `,
  ];

  decideTextColor(bgColor: string): string {
    let color: Color | null = null;

    const variableValue = sanatizeCssVarName(bgColor);
    if (variableValue) {
      const variableColor =
        getComputedStyle(this).getPropertyValue(variableValue);

      // If there's no color, then we have the situation where the css
      // variable is not yet defined
      if (!variableColor) {
        if (bgIsOpColor(bgColor)) {
          // If the color is one of the naked open-props colors like `purple`
          // then we can use light text because we append a dark-suffix to these
          // colors.
          return ValueBox.lightText;
        }
        // If we don't know what color the background is (likely beacuse the
        // variable hasn't loaded yet) we use a dark text color. This isn't
        // _great_ but should be okay and if user's need to they can define the
        // text color
        return ValueBox.darkText;
      }
      color = new Color(variableColor);
    }

    try {
      color = new Color(bgColor);
    } catch (e) {
      console.warn("Could not parse color", e);
    }

    if (!color) {
      return ValueBox.lightText;
    }

    const lightTextContrast = color.contrastWCAG21(
      new Color(ValueBox.lightText)
    );
    const darkTextContrast = color.contrastWCAG21(new Color(ValueBox.darkText));

    return lightTextContrast > darkTextContrast
      ? ValueBox.lightText
      : ValueBox.darkText;
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.setProperty("--bg-color", validateBgColor(this.bg));
    this.style.setProperty(
      "--text-color",
      this.textColor !== "" ? this.textColor : this.decideTextColor(this.bg)
    );
  }

  render() {
    return html`
      <div class="title">
        <div class="main">
          <slot name="title">${this.title}</slot>
        </div>
        <div class="subtitle">
          <slot name="subtitle">${this.subtitle}</slot>
        </div>
      </div>
      <div class="value">
        <div class="main">
          <slot name="value">${sanatizeValue(this.value)}</slot>
        </div>
        <div class="subvalue">
          <slot name="subvalue">${this.subvalue}</slot>
        </div>
      </div>
      <div class="icon">
        <slot name="icon">
          <shiny-icon name=${this.icon}></shiny-icon>
        </slot>
      </div>
    `;
  }
}

function validateBgColor(value: string): string {
  const unwrappedCssVarName = sanatizeCssVarName(value);
  if (unwrappedCssVarName) {
    return `var(${unwrappedCssVarName})`;
  }

  return value;
}
type CSSVariable = `--${string}`;

function bgIsOpColor(value: string): boolean {
  const validOPColors = new Set(
    [
      "Stone",
      "Red",
      "Pink",
      "Purple",
      "Violet",
      "Indigo",
      "Blue",
      "Cyan",
      "Teal",
      "Green",
      "Lime",
      "Yellow",
      "Orange",
      "Choco",
      "Brown",
      "Sand",
      "Camo",
      "Jungle",
    ].map((color) => color.toLowerCase())
  );

  return validOPColors.has(value.toLowerCase());
}
/**
 * Makes sure that the passed css variable is in the format of `--my-variable`
 * rather than wrapped in a `var()` function. Can also be used to check if a
 * string is a valid css variable.
 * @param value The value to check
 * @returns The unwrapped css variable or null if the value is not a valid css
 * variable.
 */
function sanatizeCssVarName(value: string): CSSVariable | null {
  if (value === "brand") {
    return "--brand";
  }

  if (bgIsOpColor(value)) {
    return `--${value.toLowerCase()}-8` as CSSVariable;
  }

  if (value.startsWith("var(--") && value.endsWith(")")) {
    return value.slice(4, -1) as CSSVariable;
  }

  if (value.startsWith("--")) {
    return value as CSSVariable;
  }

  return null;
}

function sanatizeValue(value: string): string {
  // If we can coerce the value to a number, do that and then truncate to 2 decimals
  const numberValue = Number(value);
  if (!isNaN(numberValue)) {
    return numberValue.toFixed(2);
  }

  return value;
}
