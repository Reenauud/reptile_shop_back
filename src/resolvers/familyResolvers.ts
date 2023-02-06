import { Query, Arg, Resolver, Mutation } from "type-graphql";
import { Family } from "../entities/Family";
import { CreateFamilyInput } from "../inputs/CreateFamilyInput";
import familyServices from "../services/familyServices";

@Resolver(Family)
export class FamilyResolvers {
  @Mutation(() => Family)
  async createFamily(
    @Arg("family") family: CreateFamilyInput
  ): Promise<Family> {
    return await familyServices.create(family);
  }
}
