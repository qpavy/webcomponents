import { Component, h } from '@stencil/core';

@Component({
  tag: 'q-scrollicon',
  styleUrl: 'q-scrollicon.scss',
  shadow: true,
})
export class QScrollicon {

  render() {
    return (
      <div id="scroll-container">
          <div class="scroll-inner">
              <div class="scroll-wheel"></div>
          </div>
      </div>
      // <Host>
      //   <slot></slot>
      // </Host>
    );
  }

}
