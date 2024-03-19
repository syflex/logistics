import { DistributionDepotController } from "./controllers /DistributionDepotController";
/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
// @ts-ignore
export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  
  const distributionDepotController = new DistributionDepotController();
  if (event.path === '/daily') {
    await distributionDepotController.RunDaily();
  } else if (event.path === '/weekly') {
     await distributionDepotController.RunWeekly();
  }
}
