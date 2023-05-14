import { PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Product } from "@common/types";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from 'uuid';

export const createProduct = async (client: DynamoDBClient, product: Product) => {
    const id = uuidv4();
    const marshalledProduct = marshall({ id, ...product }, { removeUndefinedValues: true });
    const marshalledStock = marshall({ product_id: id, count: product.count }, { removeUndefinedValues: true });

    return await Promise.all([
        client.send(new PutItemCommand({
            TableName: process.env.PRODUCTS_TABLE,
            Item: marshalledProduct
        })),
        client.send(new PutItemCommand({
            TableName: process.env.STOCKS_TABLE,
            Item: marshalledStock
        }))
    ]);
}