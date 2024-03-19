import { locationType, scanningType } from "../entities/RollContainer";
import { RollContainerRepository } from "../repositories/RollContainerRepository";

export class RollContainerController {

    async addLocation(data: locationType) {
        const rollContainerRepository = new RollContainerRepository();
        const rollContainerEntity = await rollContainerRepository.get(data.rollContainerId);
        rollContainerEntity.setLatitude(data.latitude);
        rollContainerEntity.setLongitude(data.longitude);
        await rollContainerRepository.save(rollContainerEntity);
        return rollContainerEntity.toLocationJson();
    }

    async addScanning(data: scanningType) {
        const rollContainerRepository = new RollContainerRepository();
        const rollContainerEntity = await rollContainerRepository.get(data.rollContainerId);
        rollContainerEntity.setIsNoteEmpty(data.isNoteEmpty);
        rollContainerEntity.setDestination(data.destination);
        await rollContainerRepository.save(rollContainerEntity);
        return rollContainerEntity.toScanningJson();
    }

    async getRollContainerObservation() {
        const rollContainerRepository = new RollContainerRepository();
        const result = await rollContainerRepository.getAll();
        return result;
    }
}