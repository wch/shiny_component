import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { setElAttr } from "./set_el_attr";
import { getElementsFromSlotChangeEvent } from "./utils/getElementsFromSlotChangeEvent";

@customElement("shiny-sidebar")
export class Sidebar extends LitElement {
  @property({ type: Boolean, reflect: true }) closed: boolean = false;
  @property({ type: Number }) openWidthPx: number = 320;
  @property({ type: Boolean, reflect: true }) collapseToIcons: boolean = false;

  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      /* Define open and closed state variables */
      --open-content-columns: auto 1fr;
      --closed-content-columns: auto 0;
      --open-content-height: auto;
      --closed-content-height: var(--size-xxl);
      --open-content-gap: var(--padding);
      --open-content-padding: var(--padding);
      --closed-content-gap: 0;
      --open-content-overflow: auto;
      --closed-content-overflow: hidden;
      --closed-content-padding: 0;
      --closed-content-opacity: 0;
      --open-width: var(--sidebar-width, 30vw);
      --closed-width: var(--padding);

      /* Default settings */
      --transition: var(--speed-fast) var(--ease-3);
      --padding: var(--size-m);
      --sidebar-content-columns: var(--open-content-columns);
      --sidebar-content-height: var(--open-content-height);
      --sidebar-content-gap: var(--open-content-gap);
      --content-opacity: 1;

      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--padding);
      background-color: var(--surface-2);
    }

    @container (max-width: 700px) {
      :host {
        width: var(--closed-width);
        z-index: 10;

        --open-width: var(--sidebar-width, var(--size-content-2));
      }

      .content {
        /* When on small screens we want the sidebar to slide over the main
              content rather than pushing it out of the way */
        position: absolute;
        box-shadow: var(--shadow-m);
      }
    }

    :host([closed]) {
      --sidebar-content-columns: var(--closed-content-columns);
      --sidebar-content-height: var(--closed-content-height);
      --sidebar-content-gap: var(--closed-content-gap);
      --sidebar-content-overflow: var(--closed-content-overflow);
      --content-opacity: var(--closed-content-opacity);

      width: var(--closed-width);
      cursor: e-resize;
    }

    .content {
      height: 100%;
      overflow: auto;
      margin: 0;
      padding-inline: var(--padding);
      width: var(--open-width);
      transition: width var(--transition), padding var(--transition);
      display: flex;
      flex-direction: column;
      background-color: inherit;
    }

    :host([closed]) .content {
      width: var(--closed-width);
    }

    .content > ::slotted(hr) {
      margin: 0 !important;
    }

    .content > ::slotted(shiny-section) {
      border-bottom: var(--border-normal);
    }

    .content > ::slotted(shiny-section:last-child) {
      border-bottom: none;
    }

    .toggle-icon {
      text-align: center;
    }

    :host([open]) .toggle-icon {
      transition: transform var(--transition);
      transform: scaleX(1);
    }

    .open-toggle {
      position: absolute;
      top: var(--size-xxs);
      left: 0;
      font-size: var(--font-size-h4);
      font-weight: var(--font-weight-headings);
      width: var(--padding);
      height: fit-content;
      cursor: pointer;
      color: var(--text-2);
    }

    :host([closed]) .toggle-icon {
      rotate: 180deg;
    }

    :host([closed][collapseToIcons]) .content {
      width: var(--padding);
    }

    :host([closed]:not([collapseToIcons])) .content {
      opacity: 0;
    }

    :host([closed][collapseToIcons]),
    :host([closed][collapseToIcons]) .content {
      width: calc(4 * var(--padding));
    }
  `;

  constructor() {
    super();
    setElAttr(this, "slot", "sidebar");

    this.addEventListener("click", (e) => {
      if (!this.closed) return;

      this.toggleClosed();
    });
  }

  toggleClosed() {
    this.closed = !this.closed;
  }

  handleToggleBtnClick(e: MouseEvent) {
    e.stopPropagation();
    this.toggleClosed();
  }

  autoCollapseOnSmallScreens() {
    // Check if the container is smaller than 700px and set the state to closed if it is
    const mediaQuery = window.matchMedia("(max-width: 700px)");

    // If the user resizes the screen smaller this will auto-collapse the
    // sidebar. It will _not_ auto-open it when it gets bigger because that
    // would be annoying if you had manually closed the sidebar
    const handleMediaQuery = (e: MediaQueryList | MediaQueryListEvent) => {
      if (e.matches) {
        this.closed = true;
      }
    };
    mediaQuery.addEventListener("change", handleMediaQuery);
    handleMediaQuery(mediaQuery);
  }

  connectedCallback() {
    super.connectedCallback();
    this.autoCollapseOnSmallScreens();
  }

  handleSlottedElementsChange(e: Event) {
    const elementsInSlot = getElementsFromSlotChangeEvent(e);

    // If we exclusivly have <shiny-section> elements in the sidebar then we should enable the icon collapse mode
    const hasOnlySections = elementsInSlot.every(
      (el) => el.tagName === "SHINY-SECTION"
    );

    this.collapseToIcons = hasOnlySections;
    console.log("hasOnlySections", hasOnlySections);
  }

  render() {
    return html`
      <div class="content" style="--sidebar-width: ${this.openWidthPx}px;">
        <slot @slotchange=${this.handleSlottedElementsChange}></slot>
      </div>
      <div
        @click=${this.handleToggleBtnClick}
        title=${this.closed ? "Open sidebar" : "Close sidebar"}
        class="open-toggle"
      >
        <div class="toggle-icon">❮</div>
      </div>
    `;
  }
}
