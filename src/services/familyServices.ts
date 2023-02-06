import { Repository } from "typeorm";
import { Family } from "../entities/Family";
import { dataSource } from "../tools/utils";
import { Reptile } from "../entities/Reptile";

export const familyRepository: Repository<Family> =
  dataSource.getRepository(Family);

export default {
  create: async (Family: Family): Promise<Family> => {
    return await familyRepository.save(Family);
  },

  getAll: async (): Promise<Family[]> => {
    return await familyRepository.find();
  },

  getFamilyById: async (id: number): Promise<Family> => {
    return await familyRepository.findOneByOrFail({ id });
  },
};
