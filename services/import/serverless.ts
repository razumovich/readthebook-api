import type { AWS } from '@serverless/typescript';
import importProductsFile from '@functions/import-products-file';
import importFileParser from '@functions/import-file-parser';
import { BUCKET_NAME, REGION } from '@common/constants';

const serverlessConfiguration: AWS = {
  service: 'import',
  frameworkVersion: '3',
  plugins: [
      'serverless-esbuild',
      'serverless-better-credentials',
      'serverless-deployment-bucket',
      'serverless-offline',
  ],
  useDotenv: true,
  provider: {
    region: REGION,
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: 'readthebook-api-import-deployment'
    },
    environment: {
      REGION,
      BUCKET_NAME,
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['s3:PutObject', 's3:GetObject', 'sqs:GetQueueUrl', 'sqs:SendMessage'],
            Resource: '*'
          },
        ]
      }
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
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
      httpPort: 2882,
      lambdaPort: 2883
    }
  },
  resources: {
    Resources: {
      readthebookUploadBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: BUCKET_NAME,
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedOrigins: ['*'],
                AllowedHeaders: ['*'],
                AllowedMethods: ['PUT']
              }
            ]
          }
        }
      }
    }
  },
};

module.exports = serverlessConfiguration;
