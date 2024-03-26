/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./graphql";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createLocation = /* GraphQL */ `mutation CreateLocation($location: CreateLocation) {
  createLocation(location: $location)
}
` as GeneratedMutation<
  APITypes.CreateLocationMutationVariables,
  APITypes.CreateLocationMutation
>;
export const createScanning = /* GraphQL */ `mutation CreateScanning($scanning: CreateScanning) {
  createScanning(scanning: $scanning)
}
` as GeneratedMutation<
  APITypes.CreateScanningMutationVariables,
  APITypes.CreateScanningMutation
>;
