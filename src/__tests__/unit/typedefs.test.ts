import { test, expect, describe } from 'vitest';
import { typeDefs } from '../../typedefs';

describe('TypeDefs Tests', () => {
  test('should define Query type with getRollContainerObservations field', () => {
    expect(typeDefs).toContain('type Query { getRollContainerObservations: [RollContainerObservations] }');
  });

  test('should define Mutation type with addLocation and addScanning fields', () => {
    expect(typeDefs).toContain('type Mutation { addLocation(rollContainerId: String!, latitude: String!, longitude: String!): Location addScanning(rollContainerId: String!, isNoteEmpty: String!, destination: String!): Scanning }');
  });

  test('should define RollContainerObservations type with rollContainerId, latitude, longitude, isNoteEmpty, and destination fields', () => {
    expect(typeDefs).toContain('type RollContainerObservations { rollContainerId: String! latitude: String! longitude: String! isNoteEmpty: String! destination: String! }');
  });

  test('should define Location type with rollContainerId, latitude, and longitude fields', () => {
    expect(typeDefs).toContain('type Location { rollContainerId: String! latitude: String! longitude: String! }');
  });

  test('should define Scanning type with rollContainerId, isNoteEmpty, and destination fields', () => {
    expect(typeDefs).toContain('type Scanning { rollContainerId: String! isNoteEmpty: String! destination: String! }');
  });
});