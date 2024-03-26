import { put } from '@aws-appsync/utils/dynamodb';
import { Context, util } from '@aws-appsync/utils';
import { CreateLocationMutationVariables } from '../types/graphql';

export function request(ctx: Context<CreateLocationMutationVariables>) {
  return put({
    key: { id: util.autoId() },
    item: {
      id: util.autoId(),
      ...ctx.args.location,
      type: 'LOCATION',
      createdAt: util.time.nowISO8601(),
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.id;
}