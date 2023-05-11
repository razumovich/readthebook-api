import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import csv from 'csv-parser';
import { Stream } from 'stream';
import {
    SQSClient,
    GetQueueUrlCommand,
    SendMessageCommand,
} from "@aws-sdk/client-sqs";
import { BUCKET_NAME, SQS_QUEUE } from "@common/constants";

const s3Client = new S3Client({});
const sqsClient = new SQSClient({});

const importFileParser = async (event) => {
    try {
        const { key } = event.Records?.[0].s3.object;

        if (!key) {
            throw new Error('Key does not exist in the bucket')
        }

        const s3ClientResponse = await s3Client.send(new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
        }));

        /**
         * Guess, there's a more performant way to get QueueUrl, but I just didn't want to hardcode it in the configuration.
         * Need to think about it in the future.
          */
        const { QueueUrl } = await sqsClient.send(new GetQueueUrlCommand({ QueueName: SQS_QUEUE }));

        (s3ClientResponse.Body as Stream)
            .pipe(csv())
            .on('data',product => {
                sqsClient.send(new SendMessageCommand({
                    QueueUrl,
                    DelaySeconds: 10,
                    MessageBody: JSON.stringify(product)
                }));
            });
    } catch (e) {
        console.error(e);
    }
};

export const main = importFileParser;
