/**
 * There are at least 3 different, incompatible interfaces for function call
 * parameters between near-api-js and the near wallet selector. This module
 * provides a standard interface and conversion functions.
 */

import { FunctionCallAction as WalletSelectorFunctionCallAction } from '@near-wallet-selector/core';
// unsupported for now, as no part of Tonic uses this
// import { FunctionCall as NearApiJsTransactionFunctionCall } from 'near-api-js/lib/transaction';
import { FunctionCallOptions as NearApiJsAccountFunctionCall } from 'near-api-js/lib/account';
import { ZERO } from '@tonic-foundation/utils';

export class StandardNearFunctionCall {
  constructor(readonly params: NearApiJsAccountFunctionCall) {}

  /**
   * Return a function call action for @wallet-selector/core.
   */
  toWalletSelectorAction(): WalletSelectorFunctionCallAction {
    if (!this.params.gas) {
      throw new Error(
        'Wallet selector action requires .gas parameter to be set'
      );
    }
    const params: WalletSelectorFunctionCallAction['params'] = {
      args: this.params.args,
      methodName: this.params.methodName,
      gas: this.params.gas.toString(),
      deposit: (this.params.attachedDeposit || ZERO).toString(),
    };
    return {
      type: 'FunctionCall',
      params,
    };
  }

  /**
   * Return params for Account.functionCall.
   */
  toAccountFunctionCallParams(): NearApiJsAccountFunctionCall {
    return this.params;
  }
}
