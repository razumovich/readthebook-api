import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { products } from '@common/db';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<null> = async () => formatJSONResponse(products);;
export const main = middyfy(getProductsList);
