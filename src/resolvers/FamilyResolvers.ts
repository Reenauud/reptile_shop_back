import { Query, Arg, Resolver, Mutation } from "type-graphql";
import { Family } from "../entities/Family";
import { CreateFamilyInput } from "../inputs/CreateFamilyInput";
import { CreateReptileInput } from "../inputs/CreateReptileInput";
import familyServices from "../services/familyServices";

@Resolver(Family)
export class FamilyResolvers {
  @Mutation(() => Family)
  async createFamily(
    @Arg("family") family: CreateFamilyInput,
  ): Promise<Family> {
    return await familyServices.create(family);
  }

  @Query(() => Family)
  async getOneFamily(
    @Arg("type") type: string, 
  ): Promise<Family> {
    return await familyServices.getByType(type);
  }

  @Query(() => [Family])
  async getAllFamilies(): Promise<Family[]> {
    return await familyServices.getAll();
  }

}
