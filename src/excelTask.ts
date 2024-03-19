import { DistributionDepotController } from "./controllers /DistributionDepotController";

export const handler = async (event : { httpMethod: string, path: string }) => {
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
