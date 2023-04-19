import { newSpecPage } from '@stencil/core/testing';
import { QCarousel } from './q-carousel';

describe('q-carousel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [QCarousel],
      html: '<q-qarousel></q-qarousel>',
    });
    expect(root).toEqualHtml(`
      <q-carousel>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </q-carousel>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [QCarousel],
      html: `<q-qarousel first="Stencil" last="'Don't call me a framework' JS"></q-qarousel>`,
    });
    expect(root).toEqualHtml(`
      <q-qarousel first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </q-qarousel>
    `);
  });
});
