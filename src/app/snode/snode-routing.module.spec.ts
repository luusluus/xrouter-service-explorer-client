import { SnodeRoutingModule } from './snode-routing.module';

describe('SnodeRoutingModule', () => {
  let snodeRoutingModule: SnodeRoutingModule;

  beforeEach(() => {
    snodeRoutingModule = new SnodeRoutingModule();
  });

  it('should create an instance', () => {
    expect(snodeRoutingModule).toBeTruthy();
  });
});
