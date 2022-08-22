import { StandardNearFunctionCall } from '@tonic-foundation/transaction/lib/shim';
import { decimalToBn } from '@tonic-foundation/utils';
import BN from 'bn.js';

export const NEAR_DECIMALS = 24;

export interface StorageDepositArgs {
  /**
   * The account to deposit for. Omit to use the calling account.
   */
  accountId: string;
  /**
   * If set to true, a spec-compliant contract will keep the minimum required
   * deposit and refund the remainder, if any.
   */
  registrationOnly?: boolean;
  /**
   * Amount to deposit. Can be a human-readble number representing NEAR or a BN representing yoctoNEAR
   */
  amount: number | BN;
}

export function storageDeposit(
  contractId: string,
  args: StorageDepositArgs,
  gas: BN
) {
  const attachedDeposit =
    typeof args.amount === 'number'
      ? decimalToBn(args.amount, NEAR_DECIMALS)
      : args.amount;

  return new StandardNearFunctionCall({
    contractId,
    methodName: 'storage_deposit',
    args: {
      account_id: args.accountId,
      registration_only: args.registrationOnly,
    },
    gas,
    attachedDeposit,
  });
}
