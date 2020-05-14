import { XrouterModule } from './xrouter.module';

describe('XrouterModule', () => {
  let xrouterModule: XrouterModule;

  beforeEach(() => {
    xrouterModule = new XrouterModule();
  });

  it('should create an instance', () => {
    expect(xrouterModule).toBeTruthy();
  });
});
