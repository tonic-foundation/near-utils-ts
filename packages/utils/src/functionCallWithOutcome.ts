import { Account } from 'near-api-js';
import { FunctionCallOptions } from 'near-api-js/lib/account';
import {
  FinalExecutionOutcome,
  getTransactionLastResult,
} from 'near-api-js/lib/providers';

/**
 * This function calls a change method, returning both the return value of the
 * call and the execution outcome.
 *
 * Some use cases need transaction/receipt IDs after calling a change method,
 * which makes the NEAR SDK's Contract class unsuitable.
 * https://github.com/near/near-api-js/blob/c84aef6cc18fe5ac1063411c95283ba3130fa656/src/contract.ts#L145
 */
export async function functionCallWithOutcome<T = any>(
  account: Account,
  params: FunctionCallOptions
): Promise<{ executionOutcome: FinalExecutionOutcome; response: T }> {
  const executionOutcome = await account.functionCall(params);
  return {
    executionOutcome,
    response: getTransactionLastResult(executionOutcome) as T,
  };
}
