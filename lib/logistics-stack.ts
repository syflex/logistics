import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GraphqlApiStack } from './api/appsync';
import { createTable } from './tables/dynamodb_table';
import { CfnOutput } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require('path');

export class LogisticsStack extends cdk.Stack {
  // private id: string = 'logistics';
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // create dynamodb table here
    const table = createTable(this, {
      id: 'ObservationTable',
    });

    const api = new GraphqlApiStack(this, id, {
			table,
    })

    // create dynamodb table here
    const depotsTable = createTable(this, {
      id: `DepotsTable`,
    });

    // create lambda functions here
    const nodeLambda = new lambda.NodejsFunction(this, `${id}-lambda`, {
      handler: 'handler',
      entry: path.join(__dirname, '../app/lambda/lambda.ts'),
      environment: {
        TABLE_NAME: depotsTable.tableName,
      },
      timeout: cdk.Duration.seconds(10),
    });

    // grant lambda permissions to read/write to the table
    depotsTable.grantWriteData(nodeLambda);

    // create outputs
    new CfnOutput(this, `${ id }-apiURL`, {
      value: api.graphqlUrl
    });

    new CfnOutput(this, `${ id }-apiId`, {
      value: api.apiId
    });
  }
}
