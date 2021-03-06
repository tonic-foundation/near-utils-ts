// from https://github.com/near/near-cli/blob/20ec871185be8b163567e147dc909f1c7f383ca9/config.js
import { ConnectConfig } from 'near-api-js';

export type NearEnv =
  | 'mainnet'
  | 'production'
  | 'testnet'
  | 'development'
  | 'localnet'
  | 'local'
  | 'test'
  | 'ci';

export function getNearConfig(env: NearEnv, extra?: Partial<ConnectConfig>): ConnectConfig {
  let config: ConnectConfig;
  const headers = {};

  switch (env) {
    case 'production':
    case 'mainnet':
      config = {
        networkId: 'mainnet',
        nodeUrl:
          process.env.NEAR_CLI_MAINNET_RPC_SERVER_URL ||
          'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        headers,
      };
      break;
    case 'development':
    case 'testnet':
      config = {
        networkId: 'testnet',
        nodeUrl:
          process.env.NEAR_CLI_TESTNET_RPC_SERVER_URL ||
          'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        headers,
      };
      break;
    case 'local':
    case 'localnet':
      config = {
        networkId: process.env.NEAR_CLI_LOCALNET_NETWORK_ID || 'local',
        nodeUrl:
          process.env.NEAR_CLI_LOCALNET_RPC_SERVER_URL ||
          process.env.NEAR_NODE_URL ||
          'http://localhost:3030',
        keyPath:
          process.env.NEAR_CLI_LOCALNET_KEY_PATH ||
          `${process.env.HOME}/.near/validator_key.json`,
        walletUrl:
          process.env.NEAR_WALLET_URL || 'http://localhost:4000/wallet',
        headers,
        helperUrl: process.env.NEAR_HELPER_URL || 'http://localhost:3000',
      };
      break;
    case 'test':
    case 'ci':
      config = {
        networkId: 'shared-test',
        nodeUrl:
          process.env.NEAR_CLI_CI_RPC_SERVER_URL ||
          'https://rpc.ci-testnet.near.org',
        masterAccount: 'test.near',
        headers,
      };
      break;
  }

  return {
    ...config,
    ...extra
  };
}
