import { StandardNearFunctionCall } from '@tonic-foundation/transaction/lib/shim';
import BN from 'bn.js';

export interface FtTransferArgs {
  /**
   * ID of account to send to
   */
  receiverId: string;
  /**
   * Amount to send
   */
  amount: BN | string;
  memo?: string;
}
export function ftTransfer(
  tokenId: string,
  args: FtTransferArgs,
  gas: BN,
  attachedDeposit = new BN(1)
) {
  return new StandardNearFunctionCall({
    contractId: tokenId,
    methodName: 'ft_transfer',
    args: {
      receiver_id: args.receiverId,
      amount: args.amount.toString(),
      memo: args.memo,
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
  amount: BN | string;
  /**
   * For full control of what gets sent, pass the message as a string.
   */
  msg?: string;
}

export function ftTransferCall(
  tokenId: string,
  args: FtTransferCallArgs,
  gas: BN,
  attachedDeposit = new BN(1)
) {
  return new StandardNearFunctionCall({
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
