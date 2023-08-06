import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Equipment } from "../entities/Equipment";

export const equipmentRepository: Repository<Equipment> = dataSource.getRepository(Equipment);

export default {
    create: async (equipment: Equipment): Promise<Equipment> => {

        const newEquipment = new Equipment()

        newEquipment.equipmentDescription = equipment.equipmentDescription
        newEquipment.equipmentDetails = equipment.equipmentDetails
        newEquipment.equipmentName = equipment.equipmentName
        newEquipment.equipmentPicture = equipment.equipmentPicture
        newEquipment.equipmentPrice = equipment.equipmentPrice
        newEquipment.equipmentQuantity = 1
        newEquipment.equipmentStock = equipment.equipmentStock
        


        return await equipmentRepository.save(newEquipment);
      },
    getAll: async (): Promise<Equipment[]> => {
        return await equipmentRepository.find();
    },
}