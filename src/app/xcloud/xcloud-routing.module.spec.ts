import { XcloudRoutingModule } from './xcloud-routing.module';

describe('XcloudRoutingModule', () => {
  let xcloudRoutingModule: XcloudRoutingModule;

  beforeEach(() => {
    xcloudRoutingModule = new XcloudRoutingModule();
  });

  it('should create an instance', () => {
    expect(xcloudRoutingModule).toBeTruthy();
  });
});
