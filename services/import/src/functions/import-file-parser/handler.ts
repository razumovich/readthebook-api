import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import csv from 'csv-parser';
import { Stream } from 'stream';
import { BUCKET_NAME } from "@common/constants";

const client = new S3Client({});

const importFileParser = async (event) => {
    try {
        const { key } = event.Records?.[0].s3.object;

        if (!key) {
            throw new Error('Key does not exist in the bucket')
        }

        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
        });
        const response = await client.send(command);

        (response.Body as Stream)
            .pipe(csv())
            .on('data', data => console.log(data))
    } catch (e) {
        console.error(e);
    }
};

export const main = importFileParser;
