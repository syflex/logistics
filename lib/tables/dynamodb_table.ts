import { RemovalPolicy } from 'aws-cdk-lib'
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'

type TableProps = {
	id: string
}

export const createTable = (scope: Construct, props: TableProps) => {
	const table = new Table(scope, props.id, {
		partitionKey: { name: 'id', type: AttributeType.STRING },
		removalPolicy: RemovalPolicy.DESTROY,
		billingMode: BillingMode.PAY_PER_REQUEST,
	})
	return table
}