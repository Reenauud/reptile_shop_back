import { Query, Arg, Resolver, Mutation } from "type-graphql";
import { Reptile } from "../entities/Reptile";
import { CreateReptileInput } from "../inputs/CreateReptileInput";
import reptileServices from "../services/reptileServices";

@Resolver(Reptile)
export class ReptileResolvers {
  @Query(() => [Reptile])
  async getAllReptiles(): Promise<Reptile[]> {
    return await reptileServices.getAll();
  }

  @Query(() => Reptile)
  async getOneReptile(@Arg("id") id: number): Promise<Reptile> {
    try {
      const reptile = await reptileServices.getReptileById(id);
      return reptile;
    } catch (e) {
      throw new Error("Impossible de trouver le reptile");
    }
  }

  @Mutation(() => Reptile)
  async createReptile(
    @Arg("reptile") reptile: CreateReptileInput
  ): Promise<Reptile> {
    return await reptileServices.create(reptile);
  }
}
