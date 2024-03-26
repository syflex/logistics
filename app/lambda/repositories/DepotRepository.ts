// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { IDepotDto } from '../type/DepotDto';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE_NAME as string;
export class DepotRepository {
    
    async save(data: IDepotDto): Promise<any> {
        try {
            await ddbDocClient.send(new PutCommand({
                TableName: tableName,
                Item: data
            }));
          } catch (err) {
            console.log("Error", err);
          }
    
        const response = {
            statusCode: 200
        };

        return response;
    }
}