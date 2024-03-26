import { Construct } from 'constructs'
import * as path from 'path'
import {
	Definition,
	GraphqlApi,
	FunctionRuntime,
	Code
} from 'aws-cdk-lib/aws-appsync'
import { Table } from 'aws-cdk-lib/aws-dynamodb'


// type AppSyncAPIProps = {
// 	appName: string
// 	table: Table
// }

// export const createAppSyncAPI = (scope: Construct, props: AppSyncAPIProps) => {
// 	const api = new GraphqlApi(scope, `${props.appName}`, {
// 		name: props.appName,
// 		definition: Definition.fromFile(path.join(__dirname, 'schema.graphql')),
// 	})

// 	// // Add the DataSource that my resolvers will make use of
// 	const tableDS = api.addDynamoDbDataSource(`createDataSource`, props.table)

// 	// Add the resolvers that will make use of the datasource
// 	api.createResolver('getLocations', {
// 		typeName: 'Query',
// 		fieldName: 'getLocations',
// 		dataSource: tableDS,
// 		runtime: FunctionRuntime.JS_1_0_0,
// 		code: Code.fromAsset(path.join(__dirname, 'js-resolvers/getLocations.js')),
// 		//use ESBuild cdk to point to the files 
// 	})

// 	api.createResolver('createLocationResolver', {
// 		typeName: 'Mutation',
// 		fieldName: 'createLocation',
// 		dataSource: tableDS,
// 		runtime: FunctionRuntime.JS_1_0_0,
// 		code: Code.fromAsset(path.join(__dirname, 'js-resolvers/createLocation.js')),
// 	})

// 	api.createResolver('createScanningResolver', {
// 		typeName: 'Mutation',
// 		fieldName: 'createScanning',
// 		dataSource: tableDS,
//         runtime: FunctionRuntime.JS_1_0_0,
// 		code: Code.fromAsset(path.join(__dirname, 'js-resolvers/createScanning.js')),
// 	})

// 	api.createResolver('getObservationsResolver', {
// 		typeName: 'Query',
// 		fieldName: 'getObservations',
// 		dataSource: tableDS,
// 		runtime: FunctionRuntime.JS_1_0_0,
// 		code: Code.fromAsset(path.join(__dirname, 'js-resolvers/getObservations.js')),
// 	})

// 	return api
// }

type AppSyncAPIProps1 = {
	table: Table
}

export class GraphqlApi1 extends Construct {

	private api: GraphqlApi

	constructor(scope: Construct, id: string, props: AppSyncAPIProps1 ){
		super(scope, id)

		this.api = new GraphqlApi(scope, `${id}-graphql-api`, {
			name: id,
			definition: Definition.fromFile(path.join(__dirname, 'schema.graphql')),
		})
	
		// // Add the DataSource that my resolvers will make use of
		const tableDS = this.api.addDynamoDbDataSource(`createDataSource`, props.table)
		
		this.api.createResolver('createLocationResolver', {
			typeName: 'Mutation',
			fieldName: 'createLocation',
			dataSource: tableDS,
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(path.join(__dirname, 'js-resolvers/createLocation.js')),
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