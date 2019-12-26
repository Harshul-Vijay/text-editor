import { Editor } from './editor';

describe('text-editor', () => {
  it('builds', () => {
    expect(new Editor()).toBeTruthy();
  });
});
