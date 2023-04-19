import { newE2EPage } from '@stencil/core/testing';

describe('q-scrollicon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<q-scrollicon></q-scrollicon>');

    const element = await page.find('q-scrollicon');
    expect(element).toHaveClass('hydrated');
  });
});
