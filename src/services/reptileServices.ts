import { Repository } from "typeorm";
import { Reptile } from "../entities/Reptile";
import { dataSource } from "../tools/utils";
import { Family } from "../entities/Family";
import { CreateReptileInput } from "../inputs/CreateReptileInput";

export const reptileRepository: Repository<Reptile> =
  dataSource.getRepository(Reptile);

export default {
  create: async (reptile: Reptile): Promise<Reptile> => {
    return await reptileRepository.save(reptile);
  },

  getAll: async (): Promise<Reptile[]> => {
    return await reptileRepository.find();
  },

  getReptileById: async (id: number): Promise<Reptile> => {
    return await reptileRepository.findOneByOrFail({ id });
  },
};
