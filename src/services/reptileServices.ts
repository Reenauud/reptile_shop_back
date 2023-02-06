import { Repository } from "typeorm";
import { Reptile } from "../entities/Reptile";
import { dataSource } from "../tools/utils";

export const reptileRepository: Repository<Reptile> =
  dataSource.getRepository(Reptile);

export default {
  create: async (name: string, description: string, price: number, quantity: number ): Promise<Reptile> => {
    const newReptile = new Reptile();
    newReptile.name = name;
    newReptile.description = description;
    newReptile.price = price;
    newReptile.quantity = quantity;

    return await reptileRepository.save(newReptile);
  },

  getAll: async (): Promise<Reptile[]> => {
    return await reptileRepository.find();
  },

  getReptileById: async (id: number): Promise<Reptile> => {
    return await reptileRepository.findOneByOrFail({ id });
  },
};
