
# Tonic TS libraries

This repository provides a set of Typescript packages that contain wrappers around common operations with [near-api-js](https://github.com/near/near-api-js). 

- [@tonic-foundation/near-config](https://github.com/tonic-foundation/near-js-standards/tree/develop/packages/config) NEAR network configuration defaults.
- [@tonic-foundation/near-storage](https://github.com/tonic-foundation/near-js-standards/tree/develop/packages/storage) Library for interacting with contracts that implement [NEP-145](https://nomicon.io/Standards/StorageManagement).
- [@tonic-foundation/near-token](https://github.com/tonic-foundation/near-js-standards/tree/develop/packages/token) Library for interacting with contracts that implement the [fungible token standards](https://nomicon.io/Standards/Tokens/FungibleToken/).
- [@tonic-foundation/near-utils](https://github.com/tonic-foundation/near-js-standards/tree/develop/packages/utils) Miscellaneous utilities for NEAR contract calls and displaying decimals.


## Developing
```
yarn
yarn build:all
```

## Publishing

```
yarn version:all <major|minor|patch>
yarn build:all
npm publish --access restricted --workspaces
```

## Auditing deps

```
yarn npm audit --all --recursive
```

## Upgrading deps

```
yarn up 'package-name-here'
yarn up '*' # bump everything
```
