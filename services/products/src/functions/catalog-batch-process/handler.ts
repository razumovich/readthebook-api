import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { createProduct } from "@common/productsUtils";

const dynamoDBClient = new DynamoDBClient({});
const snsClient = new SNSClient({});

const catalogBatchProcess = async (event) => {
    for (const {body} of event.Records) {
        await createProduct(dynamoDBClient, JSON.parse(body));
    }

    /**
     * Guess it would be a good idea to create a more informative message (what products were created etc.).
     * And maybe I will add this code to createProduct later.
     */
    await snsClient.send(new PublishCommand({
        TopicArn: process.env.SNS_TOPIC,
        Message: "Products have been created",
        Subject: "ReadTheBook Products Import",
    }))
};
export const main = catalogBatchProcess;
