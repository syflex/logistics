import { put } from '@aws-appsync/utils/dynamodb';
import { Context, util } from '@aws-appsync/utils';
import { CreateScanningMutationVariables } from '../types/graphql';

export function request(ctx: Context<CreateScanningMutationVariables>) {
  return put({
    key: { id: util.autoId() },
    item: {
      id: util.autoId(),
      ...ctx.args.scanning,
      type: 'SCANNING',
      createdAt: util.time.nowISO8601(),
    },
  });
}

export function response(ctx: Context) {
  return ctx.result.item.id;
}