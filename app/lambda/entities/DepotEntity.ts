import { Entity } from "./Entity";
import { ObjectValues } from "../lib/typescriptHelpers";
import { IDepotDto } from "../type/DepotDto";

export const capacityOptions = {
    DAILY: 'daily',
    WEEKLY: 'weekly'
} as const;

export type CapacityOptionsType = ObjectValues<typeof capacityOptions>

export type DepotCapacity = {
    depotId: string;
    name: string;
    capacity: string;
    type: CapacityOptionsType;
};

export class DepotEntity extends Entity{
    private type: CapacityOptionsType = capacityOptions.DAILY
    private depotId: string
    private name: string = ''
    private capacity: number = 0
    private createdAt: Date = new Date()

    constructor(depotId: string) {
        super()
        this.depotId = depotId
    }

    static create(depot: DepotCapacity) {
        const depotEntity = new DepotEntity(depot.depotId)
        depotEntity.setName(depot.name)
        depotEntity.setCapacity(Number(depot.capacity))
        depotEntity.setType(depot.type)
        return depotEntity.toDatabaseJson()
    }

    setType(type: CapacityOptionsType) {
        this.type = type
        return this
    }

    setDepotId(depotId: string) {
        this.depotId = depotId
        return this
    }

    setName(name: string) {
        this.name = name
        return this
    }

    setCapacity(capacity: number) {
        this.capacity = capacity
        return this
    }

    toDatabaseJson(): IDepotDto {
        return {
            id: this.getId().toString(),
            type: this.type,
            depotId: this.depotId,
            name: this.name,
            capacity: this.capacity,
            createdAt: this.createdAt.toISOString()
        }
    }
}
