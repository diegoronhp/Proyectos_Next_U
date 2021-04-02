import { Tiendaonline3Page } from './app.po';

describe('tiendaonline3 App', function() {
  let page: Tiendaonline3Page;

  beforeEach(() => {
    page = new Tiendaonline3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
