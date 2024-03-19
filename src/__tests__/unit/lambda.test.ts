import { test, beforeEach, expect, describe, afterEach, vi } from 'vitest'
import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs } from '../../typedefs';
import { resolvers } from '../../resolvers';
import { handler } from '../../excelTask';

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

  test('should throw an error when httpMethod is not GET', async () => {
    const event = { httpMethod: 'POST', path: '/daily' };
    await expect(handler(event)).rejects.toThrowError(
      'getMethod only accept GET method, you tried: POST'
    );
  });
});
