import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { products } from '@common/db';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<null> = async (event: APIGatewayProxyEvent) => {
  const { productId } = event.pathParameters;
  const product = products.find(({ id }) => id === productId );

  return product
      ? formatJSONResponse(product)
      : formatJSONResponse(null, 404);
};
export const main = middyfy(getProductsById);
