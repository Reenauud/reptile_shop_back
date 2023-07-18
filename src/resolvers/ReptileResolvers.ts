import { Query, Arg, Resolver, Mutation } from "type-graphql";
import { Reptile } from "../entities/Reptile";
import { CreateReptileInput } from "../inputs/CreateReptileInput";
import reptileServices from "../services/reptileServices";
import { CategoryName } from "../entities/Category";

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

  @Query(() => Reptile)
  async getOneReptileByName(@Arg("name") name: string): Promise<Reptile> {
    try {
      const reptile = await reptileServices.getReptileByName(name);
      return reptile;
    } catch (e) {
      throw new Error("Impossible de trouver le reptile");
    }
  }

  @Mutation(() => Reptile)
  async createReptile(
    @Arg("reptile") reptile: CreateReptileInput,
  ): Promise<Reptile> {
    console.log(reptile);
    return await reptileServices.create(reptile);
  }

  @Mutation(() => Reptile)
  async addToCategory(
    @Arg("name") name: string,
    @Arg("categoryName") categoryName: CategoryName,
  ): Promise<Reptile> {
    return await reptileServices.addToCategory(name, categoryName);
  }

  @Query(() => [Reptile])
  async getAnimalsByCategory(
    @Arg("categoryName") categoryName: CategoryName,
  ): Promise<Reptile[]> {
    try {
      const animals = await reptileServices.getReptilesByCategory(categoryName);
      return animals;
    } catch (e) {
      throw new Error("Erreur en cherchant les animaux liés à cette catégorie.")
    }
  }

  @Mutation(() => Reptile)
    async linkUpkeepToReptile(
        @Arg("reptileId") reptileId: number,
        @Arg("upkeepId") upkeepId: number,
    ): Promise<Reptile> {
        try {
            const updatedReptile = await reptileServices.link(reptileId, upkeepId);
            return updatedReptile;
        } catch (err: any) {
            console.log(err.message)
            throw new Error("Erreur en reliant les informations à l'animal correspondant.")
        }
    }

    @Mutation(() => Reptile)
    async updateReptileName(
      @Arg("reptileId") reptileId: number,
      @Arg("name") name: string,
    ): Promise<Reptile> {
      try {
        const updatedReptile = await reptileServices.update(reptileId, name);
        return updatedReptile;
      } catch (err) {
        throw new Error("Erreur en changeant le nom de l'animal.")
      }
    }

    @Query(() => Reptile)
    async getUpkeepByAnimal(
        @Arg("animal") animal: string,
    ): Promise<Reptile> {
        try {
            const reptile = await reptileServices.findAnimalWithUpkeep(animal);
            return reptile;
        } catch (err: any) {
            //throw new Error("Erreur en cherchant les informations d'entretien de l'animal.");
            throw new Error(err.message);
        }
    }
}
