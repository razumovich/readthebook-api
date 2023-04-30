import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Product, Stock } from "@common/types";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<null> = async () => {
    try {
        const client = new DynamoDBClient({ region: process.env.REGION });
        const { Items: productItems } = await client.send(new ScanCommand({
            TableName: process.env.PRODUCTS_TABLE
        }));
        const { Items: stockItems } = await client.send(new ScanCommand({
            TableName: process.env.STOCKS_TABLE
        }));
        const stocks = stockItems.map(item => unmarshall(item)) as Stock[];

        const products = productItems.map(item => {
            const product = unmarshall(item) as Product
            const count = stocks.find(({ product_id }) => product_id === product.id)?.count || 0;

            return { ...product, count}
        });

        return formatJSONResponse(products)
    } catch (e) {
        console.error(e);
        return formatJSONResponse({ error: 'Something went wrong' }, 500);
    }
};
export const main = middyfy(getProductsList);

