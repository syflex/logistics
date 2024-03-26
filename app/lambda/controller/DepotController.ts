
import { DepotEntity } from "../entities/DepotEntity";
import { DepotRepository } from "../repositories/DepotRepository";
import * as xlsx from 'xlsx'
import { capacityOptions, CapacityOptionsType } from "../entities/DepotEntity";

type DepotForecastType = {
    DepotId: string
    'Depot Name': string
    Capacity: string
}

export class DepotController {
    private depotRepository: DepotRepository;

    constructor() {
        this.depotRepository = new DepotRepository();
    }

    async RunDaily() {
        // get daily forecast from excel
        const depotsDailyForecast = await this.readExcelFile('daily.xlsx');

        if(depotsDailyForecast.length === 0) {
            throw new Error('No depots found');
        }

        await this.processDepots(depotsDailyForecast, capacityOptions.DAILY);
    }

    async RunWeekly() {
        // get weekly forecast from excel
        const depotsWeeklyForecast = await this.readExcelFile('weekly.xlsx');

        if(depotsWeeklyForecast.length === 0) {
            throw new Error('No depots found');
        }

        await this.processDepots(depotsWeeklyForecast, capacityOptions.WEEKLY);
    }

    async readExcelFile(filename: string): Promise<DepotForecastType[]> {
        const dailyExcelFile = xlsx.readFile(`excel/${filename}`);
        const sheetName = dailyExcelFile.SheetNames[0];
        return xlsx.utils.sheet_to_json(dailyExcelFile.Sheets[sheetName])
    }

    async processDepots(
            depotsDailyForecast: DepotForecastType[],
            type: CapacityOptionsType
        ): Promise<void> {
    
        for (let depotDailyForecast of depotsDailyForecast) {
            const depotDbJson = DepotEntity.create({
                depotId: depotDailyForecast['DepotId'],
                name: depotDailyForecast['Depot Name'],
                capacity: depotDailyForecast['Capacity'],
                type: type
            });
            await this.depotRepository.save(depotDbJson);
        }
    }
}