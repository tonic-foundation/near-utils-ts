/**
 * Functions for checking status of a transaction, including
 * checking for errors in a promise chain.
 */
import { Near } from 'near-api-js';
import {
  FinalExecutionOutcome,
  JsonRpcProvider,
} from 'near-api-js/lib/providers';
import { ExecutionOutcome } from 'near-api-js/lib/providers/provider';

export function isErrorStatus(
  s: ExecutionOutcome['status'] | FinalExecutionOutcome['status']
): boolean {
  if (typeof s === 'string') {
    return s === 'Failure';
  }
  return 'Failure' in s;
}

/**
 *
 * @param txId
 * @returns true if success, false otherwise
 */
export async function didTxSucceed(
  near: Near,
  accountId: string,
  txId: string
): Promise<boolean> {
  // It's not exactly this. Actual rpc response has more fields, but we only
  // need these fields for what we're doing. RPC will throw its own errors,
  // so it's fine to use the type as is.
  const ret: FinalExecutionOutcome = await (
    near.connection.provider as JsonRpcProvider
  ).sendJsonRpc('EXPERIMENTAL_tx_status', [txId, accountId]);

  const hasError = ret.receipts_outcome.some((o) => {
    return isErrorStatus(o.outcome.status);
  });

  return !isErrorStatus(ret.status) && !hasError;
}
