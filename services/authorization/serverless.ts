import type { AWS } from '@serverless/typescript';
import basicAuthorizer from '@functions/basic-authorizer';

const serverlessConfiguration: AWS = {
  service: 'authorization',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: [
      'serverless-esbuild',
      'serverless-better-credentials',
      'serverless-deployment-bucket',
      'serverless-dotenv-plugin',
      'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',

    },
  },
  // import the function via paths
  functions: { basicAuthorizer },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    "serverless-offline": {
      httpPort: 2884,
      lambdaPort: 2885
    }
  },
};

module.exports = serverlessConfiguration;
