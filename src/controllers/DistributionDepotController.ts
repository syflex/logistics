import { EntityData, EntityDataValue, EntityId } from "redis-om";
import { DepotCapacityType, DistributionDepot } from "../entities/DistributionDepot";
import { Entity } from "../entities/Entity";
import { Entity as OmEntity } from "redis-om";
import { DistributionDepotRepository } from "../repositories/DistributionDepotRepository";
import { RollContainerRepository } from "../repositories/RollContainerRepository";
import xlsx from 'xlsx'
import { ObjectValues } from "../lib/typescriptHelpers";


const capacityOptions = {
    DAILY: 'daily',
    WEEKLY: 'weekly'
} as const;

type CapacityOptions = ObjectValues<typeof capacityOptions>

type DepotDailyWeeklyForecastType = {
    DepotId: string
    'Depot Name': string
    Capacity: string
}

type DepotType = {
    depotId: string
    name: string
    dailyCapacity: string
    weeklyCapacity: {
        date: string
        capacity: string
    }
    lastUpdated: string
}

export class DistributionDepotController extends Entity {

    async RunDaily() {
        // get daily forecast from excel
        const depotsDailyForecast = await this.readExcelFile('daily.xlsx');
        // check if the depot exists and greather than the 0

        if(depotsDailyForecast.length === 0) {
            throw new Error('No depots found');
        }

        await this.processDepots(depotsDailyForecast, capacityOptions.DAILY);
    }

    async RunWeekly() {
        const depotsWeeklyForecast = await this.readExcelFile('weekly.xlsx');

        if(depotsWeeklyForecast.length === 0) {
            throw new Error('No depots found');
        }

        await this.processDepots(depotsWeeklyForecast, capacityOptions.WEEKLY);
    }

    async readExcelFile(filename: string): Promise<any[]> {
        const dailyExcelFile = xlsx.readFile(`excel/${filename}`);
        const sheetName = dailyExcelFile.SheetNames[0];
        return xlsx.utils.sheet_to_json(dailyExcelFile.Sheets[sheetName]) as DepotDailyWeeklyForecastType[];
    }

    async getDepotMap() {
        const distributionDepotRepository = new DistributionDepotRepository();
        const allDepots = await distributionDepotRepository.getAllDepots();
        const depotMap = new Map(allDepots.map(depot => [depot.depotId, depot]));

        return {depotMap, distributionDepotRepository};
    }

    async createDepotEntity(depotDailyForecast: DepotDailyWeeklyForecastType, type: CapacityOptions): Promise<DistributionDepot> {
        const depotEntity = DistributionDepot.create({
            depotId: depotDailyForecast['DepotId'],
            name: depotDailyForecast['Depot Name']
        });

        if(type === capacityOptions.DAILY) {
            depotEntity.setDailyCapacity(depotDailyForecast['Capacity']);
            depotEntity.setLastUpdated(new Date().toISOString());
        } else if(type === capacityOptions.WEEKLY){
            depotEntity.setWeeklyCapacity({
                date: new Date().toISOString(),
                capacity: depotDailyForecast['Capacity']
            });
        } else {
            throw new Error('Invalid capacity type');
        }

        return depotEntity;
    }

    async processDepots(
        depotsDailyForecast: DepotDailyWeeklyForecastType[],
        type: CapacityOptions): Promise<void> {
    
        const {depotMap, distributionDepotRepository} = await this.getDepotMap();
    
        for (let depotDailyForecast of depotsDailyForecast) {
            const depotEntity = await this.createDepotEntity(depotDailyForecast, type);
    
            const depotId = depotDailyForecast['DepotId'];
            const depot = depotMap.get(depotId);
    
            if (depot && depot[EntityId]) {
                depotEntity.setId(depot[EntityId]);
            }
    
            if (type === capacityOptions.DAILY) {
                depotEntity.setWeeklyCapacity({
                    date: (depot as DepotType).weeklyCapacity['date'] ?? '',
                    capacity: (depot as DepotType).weeklyCapacity['capacity'] ?? ''
                });
            } else {
                depotEntity.setDailyCapacity(depot && depot.dailyCapacity ? depot.dailyCapacity.toString() : '');
                depotEntity.setLastUpdated(depot && depot.lastUpdated ? depot.lastUpdated.toString() : '');
            }
    
            await distributionDepotRepository.saveDepot(depotEntity);
        }
    }
    

    async getRollContainerData() {
        const rollContainerRepository = new RollContainerRepository();
        return await rollContainerRepository.getAll();
    }
}