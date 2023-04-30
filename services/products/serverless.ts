import type { AWS } from '@serverless/typescript';
import { KeyType, ScalarAttributeType } from "@aws-sdk/client-dynamodb";
import getProductsList from '@functions/get-products-list';
import getProductById from '@functions/get-product-by-id';
import createProduct from "@functions/create-product";

const serverlessConfiguration: AWS = {
  service: 'products',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-better-credentials',
    'serverless-dynamodb-local',
    'serverless-offline',
  ],
  provider: {
    region: "eu-west-1",
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:PutItem'],
            Resource: '*'
          },
        ]
      }
    },
    environment: {
      REGION: 'eu-west-1',
      PRODUCTS_TABLE: 'products',
      STOCKS_TABLE: 'stocks',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductById, createProduct },
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
      httpPort: 2880,
      lambdaPort: 2881
    }
  },
  resources: {
    Resources: {
      productsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'products',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: ScalarAttributeType.S
            }
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: KeyType.HASH
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      },
      stocksTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'stocks',
          AttributeDefinitions: [
            {
              AttributeName: 'product_id',
              AttributeType: ScalarAttributeType.S
            }
          ],
          KeySchema: [
            {
              AttributeName: 'product_id',
              KeyType: KeyType.HASH
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
