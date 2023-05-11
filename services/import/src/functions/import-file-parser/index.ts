import { handlerPath } from '@libs/handler-resolver';
import { BUCKET_NAME } from "@common/constants";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: BUCKET_NAME,
        event: 's3:ObjectCreated:*',
        existing: true,
        forceDeploy: true,
        rules: [
          {
            prefix: 'uploaded'
          }
        ]
      },
    },
  ],
};
