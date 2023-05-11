import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({});

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
  try {
    const fileName = event.queryStringParameters?.name;

    if (!fileName) {
      const error = '"name" query parameter has not been provided.'

      console.error(error);
      return formatJSONResponse({ error }, 404);
    }

    return formatJSONResponse(
        await getSignedUrl(
            s3Client,
            new PutObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `uploaded/${fileName}` }),
        ));
  } catch(e) {
    console.error(e);
    return formatJSONResponse(e, 500);
  }
};

export const main = middyfy(importProductsFile);
