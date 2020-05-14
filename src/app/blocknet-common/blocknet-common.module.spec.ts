import { BlocknetCommonModule } from './blocknet-common.module';

describe('BlocknetCommonModule', () => {
  let blocknetCommonModule: BlocknetCommonModule;

  beforeEach(() => {
    blocknetCommonModule = new BlocknetCommonModule();
  });

  it('should create an instance', () => {
    expect(blocknetCommonModule).toBeTruthy();
  });
});
