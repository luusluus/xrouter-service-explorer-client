import { XrouterRoutingModule } from './xrouter-routing.module';

describe('XrouterRoutingModule', () => {
  let xrouterRoutingModule: XrouterRoutingModule;

  beforeEach(() => {
    xrouterRoutingModule = new XrouterRoutingModule();
  });

  it('should create an instance', () => {
    expect(xrouterRoutingModule).toBeTruthy();
  });
});
