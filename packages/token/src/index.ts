import { functionCallWithOutcome, tgasAmount } from '@tonic-foundation/utils';
import BN from 'bn.js';
import { Account } from 'near-api-js';
import { NEAR_METADATA } from './native-near';
import { FungibleTokenMetadata } from './types';
import {
  FtTransferArgs,
  ftTransfer as makeFtTransferTxn,
  FtTransferCallArgs,
  ftTransferCall as makeFtTransferCallTxn,
} from './transaction';

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

export async function ftTransfer(
  account: Account,
  tokenId: string,
  args: FtTransferArgs,
  gas = tgasAmount(30),
  attachedDeposit = new BN(1)
) {
  return await functionCallWithOutcome(
    account,
    makeFtTransferTxn(
      tokenId,
      args,
      gas,
      attachedDeposit
    ).toAccountFunctionCallParams()
  );
}

export async function ftTransferCall(
  account: Account,
  tokenId: string,
  args: FtTransferCallArgs,
  gas = tgasAmount(100),
  attachedDeposit = new BN(1)
) {
  return await functionCallWithOutcome(
    account,
    makeFtTransferCallTxn(
      tokenId,
      args,
      gas,
      attachedDeposit
    ).toAccountFunctionCallParams()
  );
}
