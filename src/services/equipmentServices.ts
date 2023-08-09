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

    delete: async (id: number | undefined) => {

        try {


        const DeleteEquipment = await equipmentRepository.findOneByOrFail( {id} )

        return await equipmentRepository.delete(DeleteEquipment)
            
        } catch (error: any) {

            throw new Error(error.message)
            
        }

    },

    update: async (id: number, equipmentName: string, equipmentDescription: string, 
        equipmentDetails: string, equipmentPicture: string, equipmentPrice: number,
         equipmentQuantity: number, equipmentStock: number): Promise<Equipment> => {

        const equipmentUpdated = await equipmentRepository.findOneByOrFail({ id })

        const newEquipment = equipmentUpdated

        newEquipment.equipmentName = equipmentName || equipmentUpdated.equipmentName
        newEquipment.equipmentDescription = equipmentDescription || equipmentUpdated.equipmentDescription
        newEquipment.equipmentDetails = equipmentDetails || equipmentUpdated.equipmentDetails
        newEquipment.equipmentPicture = equipmentPicture || equipmentUpdated.equipmentPicture
        newEquipment.equipmentPrice = equipmentPrice || equipmentUpdated.equipmentPrice
        newEquipment.equipmentQuantity = equipmentQuantity || equipmentUpdated.equipmentQuantity
        newEquipment.equipmentStock = equipmentStock || equipmentUpdated.equipmentStock

        return await equipmentRepository.save(newEquipment)
    },

    getEquipmentById: async (id: number): Promise<Equipment> => {
        return await equipmentRepository.findOneByOrFail({ id });
    },
}