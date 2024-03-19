import { test, beforeEach, expect, describe, afterEach } from 'vitest'
import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs } from '../../typedefs';
import { resolvers } from '../../resolvers';

describe('Lambda Tests', () => {
  let server: ApolloServer;

  beforeEach(() => {
    server = new ApolloServer({ typeDefs, resolvers });
  });

  afterEach(async () => {
    await server.stop();
  });

  test('should create an instance of ApolloServer', () => {
    expect(server).toBeInstanceOf(ApolloServer);
  });
});