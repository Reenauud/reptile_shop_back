import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Equipment } from "../entities/Equipment";

export const equipmentRepository: Repository<Equipment> = dataSource.getRepository(Equipment);

export default {
    create: async (equipment: Equipment): Promise<Equipment> => {
        return await equipmentRepository.save(equipment);
      },
    getAll: async (): Promise<Equipment[]> => {
        return await equipmentRepository.find();
    },
}