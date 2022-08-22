import BN from 'bn.js';
import { Account } from 'near-api-js';
import { functionCallWithOutcome } from '@tonic-foundation/utils';
import { StorageBalance } from './types';
import {
  storageDeposit as makeStorageDepositTxn,
  StorageDepositArgs,
} from './transaction';

export * from './types';

const ONE_TGAS = new BN('1000000000000');
const DEFAULT_GAS = ONE_TGAS.mul(new BN(100));

function toBnStorageBalance(balance: StorageBalance): StorageBalance<BN> {
  return {
    available: new BN(balance.available),
    total: new BN(balance.total),
  };
}

export async function storageBalanceOf(
  account: Account,
  contractId: string,
  accountId?: string
): Promise<StorageBalance<BN> | null> {
  const account_id = accountId || account.accountId;
  const balance: StorageBalance<string> | null = await account.viewFunction(
    contractId,
    'storage_balance_of',
    {
      account_id,
    }
  );
  return balance ? toBnStorageBalance(balance) : null;
}

/**
 * Deposit storage balance
 *
 * @param account Account to call with
 * @param contractId Contract to deposit into
 * @param args
 * @param gas Gas allowance, defaults to 100TGas
 */
export async function storageDeposit(
  account: Account,
  contractId: string,
  args: StorageDepositArgs,
  gas = DEFAULT_GAS
) {
  const { executionOutcome, response: balance } =
    await functionCallWithOutcome<StorageBalance>(
      account,
      makeStorageDepositTxn(contractId, args, gas).toAccountFunctionCallParams()
    );

  if (!balance) {
    throw new Error('Error depositing storage');
  }

  return {
    executionOutcome,
    result: toBnStorageBalance(balance),
  };
}
