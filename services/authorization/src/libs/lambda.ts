export const generatePolicy = (principalId: any, effect: any, resource: any) => {
  const authResponse: any = {
    principalId
  };

  if (effect && resource) {
    const policyDocument: any = {
      Version: '2012-10-17',
      Statement: []
    };

    const statement = {
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    };

    policyDocument.Statement[0] = statement;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
};
