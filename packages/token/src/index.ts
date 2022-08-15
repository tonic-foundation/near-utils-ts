import { functionCallWithOutcome, tgasAmount } from '@tonic-foundation/utils';
import BN from 'bn.js';
import { Account } from 'near-api-js';
import { NEAR_METADATA } from './native-near';
import { FungibleTokenMetadata } from './types';

export * from './native-near';
export * from './types';

export async function ftMetadata(
  account: Account,
  tokenId: string
): Promise<FungibleTokenMetadata> {
  return await account.viewFunction(tokenId, 'ft_metadata', {});
}

export async function ftOrNativeNearMetadata(
  account: Account,
  tokenId: string
): Promise<FungibleTokenMetadata> {
  if (tokenId.toUpperCase() === 'NEAR') {
    return NEAR_METADATA;
  }
  return ftMetadata(account, tokenId);
}

/**
 * Get balance of the account as a BN
 */
export const ftBalanceOf = async (
  account: Account,
  tokenId: string,
  accountId: string
) => {
  return account
    .viewFunction(tokenId, 'ft_balance_of', { account_id: accountId })
    .then((n) => new BN(n))
    .catch(() => {
      return new BN(0);
    });
};

export interface FtTransferArgs {
  /**
   * ID of account to send to
   */
  receiverId: string;
  /**
   * Amount to send
   */
  amount: BN;
}
export async function ftTransfer(
  account: Account,
  tokenId: string,
  args: FtTransferArgs,
  gas = tgasAmount(30),
  attachedDeposit = new BN(1)
) {
  return await functionCallWithOutcome(account, {
    contractId: tokenId,
    methodName: 'ft_transfer',
    args: {
      receiver_id: args.receiverId,
      amount: args.amount.toString(),
    },
    gas,
    attachedDeposit,
  });
}

export interface FtTransferCallArgs {
  /**
   * ID of account to send to
   */
  receiverId: string;
  /**
   * Amount to send
   */
  amount: BN;
  /**
   * For full control of what gets sent, pass the message as a string.
   */
  msg?: string;
}
export async function ftTransferCall(
  account: Account,
  tokenId: string,
  args: FtTransferCallArgs,
  gas = tgasAmount(100),
  attachedDeposit = new BN(1)
) {
  return await functionCallWithOutcome(account, {
    contractId: tokenId,
    methodName: 'ft_transfer_call',
    args: {
      receiver_id: args.receiverId,
      amount: args.amount.toString(),
      msg: args.msg,
    },
    gas,
    attachedDeposit,
  });
}
