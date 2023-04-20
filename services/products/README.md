# readthebook Products Service

This service is designed to manage products in Read The Book App

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` or `npm run deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` or `yarn deploy` to deploy this stack to AWS

### Run locally
- `yarn start`  if you're using Yarn
- `npm start`

### Endpoints
- POST https://yc7al9ctle.execute-api.eu-west-1.amazonaws.com/dev/products Creates a product
- GET https://yc7al9ctle.execute-api.eu-west-1.amazonaws.com/dev/products shows the list of all products
- GET https://yc7al9ctle.execute-api.eu-west-1.amazonaws.com/dev/products/{productId} shows the specific product
