import { Query, Arg, Resolver, Mutation } from "type-graphql";
import equipmentServices from "../services/equipmentServices";
import { Equipment } from "../entities/Equipment";
import { CreateEquipmentInput } from "../inputs/CreateEquipmentInput";
import { stringify } from "querystring";

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

    @Mutation(()=> [Equipment]) async DeleteEquipment(
      @Arg("equipmentId") id : number
    ){

        try {

          await equipmentServices.delete(id)
          return await equipmentServices.getAll();


          // return equipment
          
        } catch (err : any) {
          throw new Error(err.message)
          
        }

    }

    @Mutation(()=> Equipment) async UpdateEquipment(

      // @Arg("equipment") equipmentName : string,
      @Arg("id") id : number,
      @Arg("name") equipmentName : string,
      @Arg("description") equipmentDescription : string,
      @Arg("details") equipmentDetails : string,
      @Arg("picture") equipmentPicture : string,
      @Arg("price") equipmentPrice : number,
      @Arg("quantity") equipmentQuantity : number,
      @Arg("stock") equipmentStock : number,


      ){

        try {
          const equipmentUpdated = await equipmentServices.update(id , equipmentName, equipmentDescription, equipmentDetails, equipmentPicture, equipmentPrice, equipmentQuantity, equipmentStock)

          return equipmentUpdated
    
          
        } catch (err : any ) {
          throw new Error(err.message)
          
        }
      }

      @Query(()=> Equipment) async GetEquipmentById(
        @Arg("id") id : number
      ){
        try {

          const equipment = await equipmentServices.getEquipmentById(id)

          return equipment
          
        } catch (err: any) {

          throw new Error(err.message)
          
        }

      }

      @Mutation(()=> Equipment) async DeleteEquipmentById(
        @Arg("id") id : number){
        
        const equipment = await equipmentServices.getEquipmentById(id)
        const equipmentId = equipment.id

        return await equipmentServices.delete(equipmentId)

      }

     



    
}