// lib/api/ts-resolvers/getObservations.ts
import { scan } from "@aws-appsync/utils/dynamodb";
function request() {
  return scan({});
}
function response(ctx) {
  const { items } = ctx.result;
  return items;
}
export {
  request,
  response
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vdHMtcmVzb2x2ZXJzL2dldE9ic2VydmF0aW9ucy50cyJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLFlBQVk7QUFJZCxTQUFTLFVBQVU7QUFDeEIsU0FBTyxLQUFLLENBQUMsQ0FBQztBQUNoQjtBQUVPLFNBQVMsU0FBUyxLQUFjO0FBQ3JDLFFBQU0sRUFBRSxNQUFNLElBQUksSUFBSTtBQUV0QixTQUFPO0FBQ1Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
