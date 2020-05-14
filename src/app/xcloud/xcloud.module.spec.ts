import { XcloudModule } from './xcloud.module';

describe('XcloudModule', () => {
  let xcloudModule: XcloudModule;

  beforeEach(() => {
    xcloudModule = new XcloudModule();
  });

  it('should create an instance', () => {
    expect(xcloudModule).toBeTruthy();
  });
});
