import { newSpecPage } from '@stencil/core/testing';
import { QScrollicon } from '../q-scrollicon';

describe('q-scrollicon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QScrollicon],
      html: `<q-scrollicon></q-scrollicon>`,
    });
    expect(page.root).toEqualHtml(`
      <q-scrollicon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </q-scrollicon>
    `);
  });
});
