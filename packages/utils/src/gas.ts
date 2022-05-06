import BN from 'bn.js';

export const ONE_TGAS = new BN(Math.pow(10, 12));
export const MAX_GAS = tgasAmount(300);

export function tgasAmount(tgas: number) {
  return new BN(tgas).mul(ONE_TGAS);
}
