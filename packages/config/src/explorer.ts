import { NearEnv } from './connection';

export function getExplorerBaseUrl(env: NearEnv) {
  switch (env) {
    case 'test':
    case 'testnet': {
      return 'https://testnet.nearblocks.io/';
    }
    case 'production':
    case 'mainnet': {
      return 'https://nearblocks.io/';
    }
    default: {
      throw new Error(`No known explorer for NEAR env ${env}`);
    }
  }
}
