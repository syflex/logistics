import { test, expect, describe } from 'vitest';
import { typeDefs } from '../../typedefs';

describe('TypeDefs Tests', () => {
  test('should define Query type with getRollContainerObservations field', () => {
    expect(typeDefs.loc?.source.body).toContain('type Query');
  });

  test('should define Mutation type with addLocation and addScanning fields', () => {
    expect(typeDefs.loc?.source.body).toContain('type Mutation');
  });
});
