/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./graphql";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getObservations = /* GraphQL */ `query GetObservations {
  getObservations {
    id
    type
    rollContainerId
    longitude
    latitude
    destination
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetObservationsQueryVariables,
  APITypes.GetObservationsQuery
>;
