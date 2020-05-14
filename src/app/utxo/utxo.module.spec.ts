import { UtxoModule } from './utxo.module';

describe('UtxoModule', () => {
  let utxoModule: UtxoModule;

  beforeEach(() => {
    utxoModule = new UtxoModule();
  });

  it('should create an instance', () => {
    expect(utxoModule).toBeTruthy();
  });
});
