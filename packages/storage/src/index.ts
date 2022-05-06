import BN from 'bn.js';
import { Account } from 'near-api-js';
import { decimalToBn, functionCallWithOutcome } from '@tonic-foundation/near-utils';
import { StorageBalance } from './types';

export * from './types';

export const NEAR_DECIMALS = 24;
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

export interface StorageDepositArgs {
  /**
   * The account to deposit for. Omit to use the calling account.
   */
  accountId?: string;
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
  const attachedDeposit =
    typeof args.amount === 'number'
      ? decimalToBn(args.amount, NEAR_DECIMALS)
      : args.amount;

  const account_id = args.accountId || account.accountId;
  const { executionOutcome, response: balance } =
    await functionCallWithOutcome<StorageBalance>(account, {
      contractId,
      methodName: 'storage_deposit',
      args: {
        account_id,
        registration_only: args.registrationOnly,
      },
      gas,
      attachedDeposit,
    });

  if (!balance) {
    throw new Error('Error depositing storage');
  }

  return {
    executionOutcome,
    result: toBnStorageBalance(balance),
  };
}
