import { SnodeModule } from './snode.module';

describe('SnodeModule', () => {
  let snodeModule: SnodeModule;

  beforeEach(() => {
    snodeModule = new SnodeModule();
  });

  it('should create an instance', () => {
    expect(snodeModule).toBeTruthy();
  });
});
