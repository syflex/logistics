import { Entity } from "./Entity";



export type DepotCapacityType = {
    depotId: string;
    name: string;
    date?: string;
    capacity: string;
};

export type WeeklyCapacity = {
    date?: string;
    capacity: string;
};

export type DistributionDepotType = {
    depotId: string
    name: string
}

export class DistributionDepot extends Entity {
    private depotId: string
    private name: string = ''
    private weeklyCapacity: WeeklyCapacity = { date: '', capacity: '' }
    private lastUpdated: string = new Date().toISOString()
    private dailyCapacity: string = ''

    constructor(depotId: string) {
        super()
        this.depotId = depotId
    }

    static create(distributionDepot: DistributionDepotType) {
        const depotEntity = new DistributionDepot(distributionDepot.depotId)
        depotEntity.setName(distributionDepot.name)
        return depotEntity
    }

    setDepotId(depotId: string) {
        this.depotId = depotId
        return this
    }

    getDepotId() {
        return this.depotId
    }

    setName(name: string) {
        this.name = name
        return this
    }

    getName() {
        return this.name
    }

    setWeeklyCapacity(weeklyCapacity: WeeklyCapacity) {
        this.weeklyCapacity = weeklyCapacity
        return this
    }

    setDailyCapacity(dailyCapacity: string) {
        this.dailyCapacity = dailyCapacity
        return this
    }

    setLastUpdated(lastUpdated: string) {
        this.lastUpdated = lastUpdated
        return this
    }

    toJson() {
        return {
            depotId: this.depotId,
            name: this.name,
            weeklyCapacity: this.weeklyCapacity,
            dailyCapacity: this.dailyCapacity,
            lastUpdated: this.lastUpdated
        }
    }
}
