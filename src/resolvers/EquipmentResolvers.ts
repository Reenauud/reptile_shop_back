import { Query, Arg, Resolver, Mutation } from "type-graphql";
import equipmentServices from "../services/equipmentServices";
import { Equipment } from "../entities/Equipment";
import { CreateEquipmentInput } from "../inputs/CreateEquipmentInput";

@Resolver(Equipment)
export class EquipmentResolvers {
    @Mutation(() => Equipment)
  async createEquipment(
    @Arg("equipment") equipment: CreateEquipmentInput,
  ): Promise<Equipment> {
    try {
      const newEquipment = await equipmentServices.create(equipment);
      return newEquipment;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

    @Query(() => [Equipment])
    async getAllEquipments(
    ): Promise<Equipment[]> {
      try {
        const equipments = await equipmentServices.getAll();
        return equipments;
      } catch (err: any) {
        throw new Error(err.message);
      }
    }
}