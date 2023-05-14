import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: 'arn:aws:lambda:${self:provider.region}:${env:AWS_ACCOUNT_ID}:function:authorization-dev-basicAuthorizer',
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        }
      },
    },
  ],
};
