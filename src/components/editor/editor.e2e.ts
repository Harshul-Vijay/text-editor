import { newE2EPage } from '@stencil/core/testing';

describe('text-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-editor></text-editor>');

    const element = await page.find('text-editor');
    expect(element).toHaveClass('hydrated');
  });
});
