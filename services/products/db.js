const { DynamoDBClient, BatchWriteItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: process.env.REGION });
const input = {
    RequestItems: {
        "products": [
            {
                PutRequest: {
                    Item: {
                        "id": { "S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
                        "title": { "S": "You Will Never Be Forgotten" },
                        "description": { "S": "By Mary South. Designed by Alex Merto, Embroidery by Alex Stikeleather" },
                        "image": { "S": "https://static01.nyt.com/images/2020/12/20/books/review/20BestBookCovers-01/20BestBookCovers-superJumbo.jpg?quality=75&auto=webp" },
                        "price": { "N": "24" },
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "id": { "S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1" },
                        "title": { "S": "Red Pill" },
                        "description": { "S": "By Hari Kunzru, Designed by John Gall" },
                        "image": { "S": "https://static01.nyt.com/images/2020/12/20/books/review/20BestBookCovers-03/20BestBookCovers-03-superJumbo.jpg?quality=75&auto=webp" },
                        "price": { "N": "15" },
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "id": { "S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3" },
                        "title": { "S": "Love" },
                        "description": { "S": "By Roddy Doyle, Designed by Sarahmay Wilkinson" },
                        "image": { "S": "https://static01.nyt.com/images/2020/12/20/books/review/20BestBookCovers-04/20BestBookCovers-04-superJumbo.jpg?quality=75&auto=webp" },
                        "price": { "N": "23" },
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "id": { "S": "7567ec4b-b10c-48c5-9345-fc73348a80a1" },
                        "title": { "S": "Pew" },
                        "description": { "S": "By Catherine Lacey, Designed by Thomas Colligan" },
                        "image": { "S": "https://static01.nyt.com/images/2020/12/20/books/review/20BestBookCovers-05/20BestBookCovers-05-superJumbo.jpg?quality=75&auto=webp" },
                        "price": { "N": "15" },
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "id": { "S": "7567ec4b-b10c-48c5-9445-fc73c48a80a2" },
                        "title": { "S": "Tokyo Ueno Station" },
                        "description": { "S": "By Yu Miri, Designed by Lauren Peters-Collaer" },
                        "image": { "S": "https://static01.nyt.com/images/2020/12/20/books/review/20BestBookCovers-06/20BestBookCovers-06-superJumbo.jpg?quality=75&auto=webp" },
                        "price": { "N": "23" },
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "id": { "S": "7567ec4b-b10c-45c5-9345-fc73c48a80a1" },
                        "title": { "S": "Indelicacy" },
                        "description": { "S": "By Amina Cain, Designed by June Park" },
                        "image": { "S": "https://static01.nyt.com/images/2020/12/20/books/review/20BestBookCovers-08/20BestBookCovers-08-superJumbo.jpg?quality=75&auto=webp" },
                        "price": { "N": "15" },
                    }
                }
            }
        ],
        "stocks": [
            {
                PutRequest: {
                    Item: {
                        "product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"},
                        "count": {"N": "11"},
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "product_id": { "S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1" },
                        "count": {"N": "4"},
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "product_id": { "S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3" },
                        "count": {"N": "0"},
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "product_id": { "S": "7567ec4b-b10c-48c5-9345-fc73348a80a1" },
                        "count": {"N": "1"},
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "product_id": { "S": "7567ec4b-b10c-48c5-9445-fc73c48a80a2" },
                        "count": {"N": "1000"},
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "product_id": { "S": "7567ec4b-b10c-45c5-9345-fc73c48a80a1" },
                        "count": {"N": "5"},
                    }
                }
            }
        ]
    }
};

try {
    const command = new BatchWriteItemCommand(input);
    client.send(command);
} catch (e) {
    console.log(e)
}
