# Tonic JS libraries

This workspace uses Yarn 3.

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
