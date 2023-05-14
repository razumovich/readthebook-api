import { generatePolicy } from "@libs/lambda";

const basicAuthorizer = async event => {
  try {
    console.log('Parsing Authorization header...');
    const { authorizationToken, methodArn } = event;
    const token = authorizationToken.replace('Basic ', '');
    const [login, password] = Buffer.from(token, 'base64').toString('utf-8').split(':');
    let isLoginSuccessfull = false;

    console.log('Checking if the provided token is correct...');
    // Loop through env. variables and check if login and password are there
    for (const [key, value] of Object.entries(process.env)) {
      if (key === login && value === password) {
        isLoginSuccessfull = true;
        break;
      }
    }

    console.log('Generating policy...');
    return isLoginSuccessfull
        ? generatePolicy('user', 'Allow', methodArn)
        : generatePolicy('user', 'Deny', methodArn)
  } catch (e) {
    console.error(e);
  }

};

export const main = basicAuthorizer;
