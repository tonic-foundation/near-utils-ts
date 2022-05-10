
# Tonic TS libraries

This repository provides a set of Typescript packages that contain wrappers around common operations with [near-api-js](https://github.com/near/near-api-js). 

- [@tonic-foundation/config](https://github.com/tonic-foundation/near-utils-ts/tree/master/packages/config) NEAR network configuration defaults.
- [@tonic-foundation/storage](https://github.com/tonic-foundation/near-utils-ts/tree/master/packages/storage) Library for interacting with contracts that implement [NEP-145](https://nomicon.io/Standards/StorageManagement).
- [@tonic-foundation/token](https://github.com/tonic-foundation/near-utils-ts/tree/master/packages/token) Library for interacting with contracts that implement the [fungible token standards](https://nomicon.io/Standards/Tokens/FungibleToken/).
- [@tonic-foundation/utils](https://github.com/tonic-foundation/near-utils-ts/tree/master/packages/utils) Miscellaneous utilities for NEAR contract calls and displaying decimals.


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
