import { CoilPage } from './app.po';

describe('inspinia App', () => {
  let page: CoilPage;

  beforeEach(() => {
    page = new CoilPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
