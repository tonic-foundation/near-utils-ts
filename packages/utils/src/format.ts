import BN from 'bn.js';

/**
 * Sort of like Number.toFixed() for BN values
 * @deprecated use toApproximateDecimalString
 */
export const formatDecimals = (amount: BN, decimals: number, precision = 0) => {
  const num = bnToFixed(amount, decimals, precision);
  const [decPart, fracPart = ''] = num.split('.');
  const paddedFracPart =
    fracPart.length > precision
      ? fracPart.substring(0, precision)
      : fracPart + '0'.repeat(precision - fracPart.length);

  return `${decPart}.${paddedFracPart}`;
};

/**
 * @deprecated use toApproximateDecimalString
 */
export const toReadableNumber = (
  number: string,
  decimals: number,
  precision = 5
): string => {
  if (!decimals) return number;

  const wholeStr = number.substring(0, number.length - decimals) || '0';
  const fracPrecision =
    precision > 0 ? Math.max(0, Math.min(precision, decimals)) : decimals;
  const fractionStr = number
    .substring(number.length - decimals)
    .padStart(decimals, '0')
    .substring(0, fracPrecision);

  return `${wholeStr}.${fractionStr}`.replace(/\.?0+$/, '');
};

/**
 * Analogous to Number.toFixed() for BN values. Example
 *
 * @example bnToFixed(new BN(123), 2, 5) === '1.23000'; // true
 *
 * @param {BN} num on-chain integer representation
 * @param {number} decimals number of decimals
 * @param {number} precision optional precision, same as in Number.toFixed()
 */
export const bnToFixed = (
  num: BN,
  decimals: number,
  precision: number = 0
): string => {
  const _num = num.toString();
  if (!decimals) return _num;

  const wholePart = _num.substring(0, _num.length - decimals) || '0';
  const fracPrecision =
    precision > 0 ? Math.max(0, Math.min(precision, decimals)) : decimals;
  const fracPart = _num
    .substring(_num.length - decimals)
    .padStart(decimals, '0')
    .substring(0, fracPrecision);

  if (fracPrecision) {
    return `${wholePart}.${fracPart.substring(0, fracPrecision)}`;
  }
  // chop off trailing 0s
  return `${wholePart}.${fracPart}`.replace(/\.?0+$/, '');
};

/**
 * Turn a decimal number into its on-chain integer representation.
 *
 * @example toDecimalPaddedString('1.23', 2) === '123'
 *
 * @param val A number as a string
 * @param decimals Number of decimals
 * @returns BN of the number
 */
export const toDecimalPaddedString = (
  val: string,
  decimals?: number
): string => {
  if (typeof decimals === 'undefined') return val;

  const [wholePart, fracPart = ''] = val.split('.');
  const res = `${wholePart}${fracPart.padEnd(decimals, '0').slice(0, decimals)}`
    .replace(/^0+/, '')
    .padStart(1, '0'); // at least 0

  return res;
};
