import { Repository, EntityId } from "redis-om";
import redis from "../client";
import { RollContainerObservationSchema } from "../schema/RollContainerObservationSchema";
import { RollContainer, rollContainerType } from "../entities/RollContainer";

export class RollContainerRepository {

    constructor() {
        this.init();
    }

    public async init() {
        await redis.connect();
    }

    save = async (rollContainer:  RollContainer) => {
        const rollContainerObservationRepository = new Repository(RollContainerObservationSchema, redis);
        await rollContainerObservationRepository.createIndex();
        // the entity id prevents it from duplicating the same record
        // thus, this will save a new record or update an existing one
        const entityId = rollContainer.getId();
        const result = await rollContainerObservationRepository.save(entityId, rollContainer.toJson());
        return result;
    }

    get = async (rollContainerId: string) => {

        const rollContainerObservationRepository = new Repository(RollContainerObservationSchema, redis);
        await rollContainerObservationRepository.createIndex();

        const result = await rollContainerObservationRepository.search()
            .where('rollContainerId').eq(rollContainerId)
            .return.first();
        
        const rollContainerEntity = new RollContainer(rollContainerId);

        if (!result) {
            return rollContainerEntity;
        }
        
        const { latitude, longitude, isNoteEmpty, destination } = result;
        rollContainerEntity.setId(result[EntityId] ? result[EntityId].toString() : '');
        rollContainerEntity.setLatitude(latitude ? latitude.toString() : '');
        rollContainerEntity.setLongitude(longitude ? longitude.toString() : '');
        rollContainerEntity.setIsNoteEmpty(isNoteEmpty ? isNoteEmpty.toString() : '');
        rollContainerEntity.setDestination(destination ? destination.toString() : '');
        
        return rollContainerEntity;
    }

    getAll = async () => {
        const rollContainerObservationRepository = new Repository(RollContainerObservationSchema, redis);
        const result = await rollContainerObservationRepository.search().return.all()

        if (!result) {
            return [];
        }
        
        const allRollContainers: rollContainerType[] = result.map((rollContainer) => {
            return {
                rollContainerId: rollContainer.rollContainerId ? rollContainer.rollContainerId.toString() : '',
                latitude: rollContainer.latitude?.toString() ?? '',
                longitude: rollContainer.longitude?.toString() ?? '',
                isNoteEmpty: rollContainer.isNoteEmpty?.toString() ?? '',
                destination: rollContainer.destination?.toString() ?? ''
            };
        });

        return allRollContainers;
    }
}