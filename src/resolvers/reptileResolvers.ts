import { Query, Arg, Resolver, Mutation } from "type-graphql";
import { Reptile } from "../entities/Reptile";
import { Family } from "../entities/Family";
import { CreateFamilyInput } from "../inputs/CreateFamilyInput";
import { CreateReptileInput } from "../inputs/CreateReptileInput";
import familyServices from "../services/familyServices";
import reptileServices, {
  reptileRepository,
} from "../services/reptileServices";

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
    console.log(reptile);
    return await reptileServices.create(reptile);
  }

  @Mutation(() => Reptile)
  async addToFamily(
    @Arg("name") name: string,
    @Arg("type") type: string
  ): Promise<Reptile> {
    return await reptileServices.addToFamily(name, type);
  }
}
