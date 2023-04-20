import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from "@common/types";
import { marshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const createProduct: ValidatedEventAPIGatewayProxyEvent<Product> = async (event) => {
    try {
        const { count = 0, ...payload } = event.body as Record<string, unknown>;
        const client = new DynamoDBClient({ region: process.env.REGION });
        const id = uuidv4();
        const product = marshall({ ...payload, id });
        const stock = marshall({ product_id: id, count })

        await client.send(new PutItemCommand({
            TableName: process.env.PRODUCTS_TABLE,
            Item: product
        }));

        await client.send(new PutItemCommand({
            TableName: process.env.STOCKS_TABLE,
            Item: stock
        }));

        return formatJSONResponse({ id, ...payload, count })
    } catch (e) {
        console.error(e);
        return formatJSONResponse({ error: 'Something went wrong' }, 500);
    }
};
export const main = middyfy(createProduct);
