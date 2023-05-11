import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDBClient, GetItemCommand, ScalarAttributeType, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Product, Stock } from "@common/types";

const dynamoDBClient = new DynamoDBClient({ region: process.env.REGION });

const getProductsById: ValidatedEventAPIGatewayProxyEvent<null> = async (event: APIGatewayProxyEvent) => {
  try {
    const { productId } = event.pathParameters;
    const { Item } = await dynamoDBClient.send(new GetItemCommand({
      TableName: process.env.PRODUCTS_TABLE,
      Key: {
        'id': { [ScalarAttributeType.S]: productId }
      },
    }));
    const { Items: stockItems } = await dynamoDBClient.send(new ScanCommand({
      TableName: process.env.STOCKS_TABLE
    }));

    if (!Item) {
      return formatJSONResponse(null, 404)
    }

    const stocks = stockItems.map(item => unmarshall(item) as Stock);
    const product = unmarshall(Item) as Product;
    const count = stocks.find(({ product_id }) => product_id === product.id)?.count || 0;

    return formatJSONResponse({...product, count})
  } catch (e) {
    console.error(e)
    return formatJSONResponse({ error: 'Something went wrong' }, 500);
  }
};
export const main = middyfy(getProductsById);
