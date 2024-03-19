import { DistributionDepotController } from "./controllers /DistributionDepotController";
/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
// @ts-ignore
export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }

  // All log statements are written to CloudWatch
  // console.info('received:', event.path);

  const distributionDepotController = new DistributionDepotController();

  await distributionDepotController.RunDaily();
 
}
