// lib/api/ts-resolvers/createLocation.ts
import { put } from "@aws-appsync/utils/dynamodb";
import { util } from "@aws-appsync/utils";
function request(ctx) {
  return put({
    key: { id: util.autoId() },
    item: {
      id: util.autoId(),
      ...ctx.args.location,
      type: "LOCATION",
      createdAt: util.time.nowISO8601()
    }
  });
}
function response(ctx) {
  return ctx.result.id;
}
export {
  request,
  response
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vdHMtcmVzb2x2ZXJzL2NyZWF0ZUxvY2F0aW9uLnRzIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsV0FBVztBQUNwQixTQUFrQixZQUFZO0FBR3ZCLFNBQVMsUUFBUSxLQUErQztBQUNyRSxTQUFPLElBQUk7QUFBQSxJQUNULEtBQUssRUFBRSxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQUEsSUFDekIsTUFBTTtBQUFBLE1BQ0osSUFBSSxLQUFLLE9BQU87QUFBQSxNQUNoQixHQUFHLElBQUksS0FBSztBQUFBLE1BQ1osTUFBTTtBQUFBLE1BQ04sV0FBVyxLQUFLLEtBQUssV0FBVztBQUFBLElBQ2xDO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFFTyxTQUFTLFNBQVMsS0FBYztBQUNyQyxTQUFPLElBQUksT0FBTztBQUNwQjsiLAogICJuYW1lcyI6IFtdCn0K
