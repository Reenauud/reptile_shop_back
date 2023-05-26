import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Family } from "../entities/Family";
import { Reptile } from "../entities/Reptile";

export const familyRepository: Repository<Family> =
  dataSource.getRepository(Family);

export default {
  create: async (family: Family): Promise<Family> => {
    return await familyRepository.save(family);
  },

  getAll: async (): Promise<Family[]> => {
    return await familyRepository.find();
  },

  getFamilyById: async (id: number): Promise<Family> => {
    return await familyRepository.findOneByOrFail({ id });
  },

  getByType: async (type: string): Promise<Family> => {
    return await familyRepository.findOneByOrFail({ type });
  },

};
