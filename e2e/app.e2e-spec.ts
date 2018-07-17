import { FormGeneratorPage } from './app.po';

describe('form-generator App', () => {
  let page: FormGeneratorPage;

  beforeEach(() => {
    page = new FormGeneratorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
