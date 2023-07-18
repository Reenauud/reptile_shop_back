import { Query, Arg, Resolver, Mutation } from "type-graphql";
import upkeepServices from "../services/upkeepServices";
import { Upkeep } from "../entities/Upkeep";
import { CreateUpkeepInput } from "../inputs/CreateUpkeepInput";
import { Reptile } from "../entities/Reptile";

@Resolver(Upkeep)
export class UpkeepResolvers {
    @Mutation(() => Upkeep)
    async createUpkeep(
        @Arg("upkeep") upkeep: CreateUpkeepInput,
    ): Promise<Upkeep> {
        try {
            const newUpkeep = await upkeepServices.create(upkeep);
            return newUpkeep; 
        } catch (err) {
            throw new Error("Erreur en enregistrant les informations d'entretien.")
        }
    }
}