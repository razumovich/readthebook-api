import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from "@common/types";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { createProduct as createProductUtil } from "@common/productsUtils";

const dynamoDBClient = new DynamoDBClient({});

const createProduct: ValidatedEventAPIGatewayProxyEvent<Product> = async (event) => {
    try {
        const product = event.body as Product;
        await createProductUtil(dynamoDBClient, product);

        return formatJSONResponse(product);
    } catch (e) {
        console.error(e);
        return formatJSONResponse({ error: 'Something went wrong' }, 500);
    }
};
export const main = middyfy(createProduct);
