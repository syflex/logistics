
  import { test, beforeEach, expect, describe, afterEach, vi } from 'vitest'
  import { handler } from '../../excelTask';
  import { DistributionDepotController } from './../../controllers/DistributionDepotController';
  
  describe('Lambda Tests', () => {
   
    let distributionDepotController: DistributionDepotController;
  
    beforeEach(() => {
        distributionDepotController = new DistributionDepotController();
    });
  
    test('should call RunDaily method when path is /daily', async () => {
        const event = { httpMethod: 'GET', path: '/daily' };
        const runDailySpy = vi.spyOn(distributionDepotController, 'RunDaily');
        await handler(event);
        expect(runDailySpy).toHaveBeenCalled();
    });
    
    test('should call RunWeekly method when path is /weekly', async () => {
        const event = { httpMethod: 'GET', path: '/weekly' };
        const runWeeklySpy = vi.spyOn(distributionDepotController, 'RunWeekly');
        await handler(event);
        expect(runWeeklySpy).toHaveBeenCalled();
    });
  });