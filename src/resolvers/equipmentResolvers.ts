import { Query, Arg, Resolver, Mutation } from "type-graphql";
import equipmentServices from "../services/equipmentServices";
import { Equipment } from "../entities/Equipment";
import { CreateEquipmentInput } from "../inputs/CreateEquipmentInput";

@Resolver(Equipment)
export class equipmentResolvers {
    @Mutation(() => Equipment)
  async createEquipment(
    @Arg("equipment") equipment: CreateEquipmentInput,
  ): Promise<Equipment> {
    return await equipmentServices.create(equipment);
  }
}