export * from './connection';
import { NearEnv } from './connection';

export function getExplorerBaseUrl(env: NearEnv) {
  switch (env) {
    case 'test':
    case 'testnet': {
      return 'https://explorer.testnet.near.org';
    }
    case 'production':
    case 'mainnet': {
      return 'https://explorer.mainnet.near.org';
    }
    default: {
      throw new Error(`No known explorer for NEAR env ${env}`);
    }
  }
}
