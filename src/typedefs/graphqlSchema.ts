import { gql } from 'apollo-server-lambda';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    getRollContainerObservations: [RollContainerObservations]
  }

  type Mutation {
    addLocation(rollContainerId: String!, latitude: String!, longitude: String!): Location
    addScanning(rollContainerId: String!, isNoteEmpty: String!, destination: String!): Scanning
  }

  type RollContainerObservations {
    rollContainerId: String!
    latitude: String!
    longitude: String!
    isNoteEmpty: String!
    destination: String!
  }

  type Location {
    rollContainerId: String!
    latitude: String!
    longitude: String!
  }

  type Scanning { 
    rollContainerId: String!
    isNoteEmpty: String!
    destination: String!
  }
`;