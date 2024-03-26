import { DepotController } from "./controller/DepotController"; 
import { capacityOptions, CapacityOptionsType } from "./entities/DepotEntity";

type EventType = {
	eventType: CapacityOptionsType;
};

const depotController = new DepotController();

exports.handler = async function (event: EventType) {
	if(event.eventType === capacityOptions.DAILY) {
		return await depotController.RunDaily();
	}

	if(event.eventType === capacityOptions.WEEKLY) {
		return await depotController.RunWeekly();
	}

	return 'No event type found';
};