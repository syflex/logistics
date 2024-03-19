import { Repository, EntityId } from "redis-om";
import redis from "../client";
import { DepotCapacityType, DistributionDepot, DistributionDepotType } from "../entities/DistributionDepot";
import { DistributionDepotSchema } from "../schema/DistributionDepotSchema";

export class DistributionDepotRepository {

    constructor() {
        this.init();
    }

    public async init() {
        await redis.connect();
    }
    
    // async getDepot(data: DepotCapacityType): Promise<DistributionDepot> {
    //     const distributionDepotRepository = new Repository(DistributionDepotSchema, redis);

    //     const result = await distributionDepotRepository.search()
    //         .where('depotId').eq(data.depotId)
    //         .return.first();

    //     if (!result) {
    //         const distributionDepotEntity = DistributionDepot.create({
    //             depotId: data.depotId,
    //             name: data.name,
    //             dailyCapacity: data.capacity,
    //             lastUpdated: new Date().toISOString(),
    //             weeklyCapacity: {
    //                 date: '',
    //                 capacity: ''
    //             }
    //         });
    //         distributionDepotEntity.setName(data.name);
    //         distributionDepotEntity.setDailyCapacity(data.capacity);
    //         distributionDepotEntity.setLastUpdated(data.date ?? new Date().toISOString());
    //         return distributionDepotEntity;
    //     }

    //     const distributionDepotEntity = new DistributionDepot(data.depotId);
    //     const { name, dailyCapacity, lastUpdated, date, capacity } = result;
    //     distributionDepotEntity.setId(result[EntityId] ? result[EntityId].toString() : '');
    //     distributionDepotEntity.setName(name ? name.toString() : '');
    //     distributionDepotEntity.setDailyCapacity(dailyCapacity ? dailyCapacity.toString() : '');
    //     distributionDepotEntity.setLastUpdated(lastUpdated ? lastUpdated.toString() : '');
    //     distributionDepotEntity.setWeeklyCapacity({ date: date ? date.toString() : '', capacity: capacity ? capacity.toString() : '' });

    //     return distributionDepotEntity;
    // }

    async saveDepot(distributionDepot: DistributionDepot) {
        const distributionDepotRepository = new Repository(DistributionDepotSchema, redis);
        await distributionDepotRepository.createIndex();


        const entityId = distributionDepot.getId();
        await distributionDepotRepository.save(entityId, distributionDepot.toJson());

        // return this.getDepot(distributionDepot.getDepotId());
    }

    async getAllDepots() {
        const distributionDepotRepository = new Repository(DistributionDepotSchema, redis);
        await distributionDepotRepository.createIndex();
        const result = await distributionDepotRepository.search().return.all()

        if (!result) {
            return [];
        }

        return result;
    }
}