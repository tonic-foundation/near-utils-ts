import BN from 'bn.js';
import { toDecimalPaddedString, toReadableNumber } from '.';

export const ZERO = new BN(0);

export const denomination = (decimals: number) => {
  return new BN(decimals).pow(new BN(10));
};

export const roundDownTo = (v: BN, nearest: BN) => {
  return v.div(nearest).mul(nearest);
};

export const floorToDecimals = (v: BN, decimals: number) => {
  if (decimals < 1) {
    throw new Error('decimals must be positive');
  }
  const mask = denomination(decimals);
  return v.div(mask).mul(mask);
};

export const floorToBn = (v: BN, closest: BN) => {
  return v.div(closest).mul(closest);
};

export const bnToApproximateDecimal = (
  v: BN,
  decimals: number,
  precision?: number
) => {
  return parseFloat(toReadableNumber(v.toString(), decimals, precision));
};

export const decimalToBn = (price: number, decimals: number) => {
  return new BN(toDecimalPaddedString(price.toString(), decimals));
};
