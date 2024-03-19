import { locationType, scanningType } from "../entities/RollContainer";
import { RollContainerController } from "../controllers /RollContainerController";

export const resolvers = {
  Query: {
    getRollContainerObservations: async () => {
      const rollContainerController = new RollContainerController();
      const result = await rollContainerController.getRollContainerObservation();
      return result;
    },
  },

  Mutation: {
    addLocation: async (_: any, args: locationType) => {
      const rollContainerController = new RollContainerController();
      const result = await rollContainerController.addLocation({...args});
      return result;
    },

    addScanning: async (_: any, args: scanningType) => {
      const rollContainerController = new RollContainerController();
      const result = await rollContainerController.addScanning({...args});
      return result;
    }
  },
};