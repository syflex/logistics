import { Construct } from 'constructs'
import * as path from 'path'
import {
	Definition,
	GraphqlApi,
	FunctionRuntime,
	Code
} from 'aws-cdk-lib/aws-appsync'
import { Table } from 'aws-cdk-lib/aws-dynamodb'

type GraphqlApiStackProps = {
	table: Table
}

interface IGraphqlApiStack {
	readonly graphqlUrl: string
	readonly apiId: string
	readonly apiName: string
}

export class GraphqlApiStack extends Construct implements IGraphqlApiStack {

	private api: GraphqlApi

	constructor(scope: Construct, id: string, props: GraphqlApiStackProps ){
		super(scope, id)

		this.api = new GraphqlApi(scope, `${id}-graphql-api`, {
			name: id,
			definition: Definition.fromFile(path.join(__dirname, 'schema.graphql')),
			// can add more configurations here like authorizationConfig, logConfig, etc.
		})
	
		// Add the DataSource that my resolvers will make use of
		const tableDS = this.api.addDynamoDbDataSource(`createDataSource`, props.table)
		
		this.api.createResolver('createLocationResolver', {
			typeName: 'Mutation',
			fieldName: 'createLocation',
			dataSource: tableDS,
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(path.join(__dirname, 'js-resolvers/createLocation.js')),
			// we can use cdk-esbuild for direct TypeScript resolver connections, instead of static JS file paths.
		})
	
		this.api.createResolver('createScanningResolver', {
			typeName: 'Mutation',
			fieldName: 'createScanning',
			dataSource: tableDS,
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(path.join(__dirname, 'js-resolvers/createScanning.js')),
		})
	
		this.api.createResolver('getObservationsResolver', {
			typeName: 'Query',
			fieldName: 'getObservations',
			dataSource: tableDS,
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(path.join(__dirname, 'js-resolvers/getObservations.js')),
		})
	}

	get graphqlUrl() {
		return this.api.graphqlUrl
	}

	get apiId() {
		return this.api.apiId
	}

	get apiName() {
		return this.api.name
	}
}