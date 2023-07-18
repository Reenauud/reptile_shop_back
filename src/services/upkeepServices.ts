import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { CreateUpkeepInput } from "../inputs/CreateUpkeepInputs";
import { Upkeep } from "../entities/Upkeep";
import { reptileRepository } from "./reptileServices";
import { Reptile } from "../entities/Reptile";

export const upkeepRepository: Repository<Upkeep> =
  dataSource.getRepository(Upkeep);

export default {
    create: async (upkeep: CreateUpkeepInput) => {
        return await upkeepRepository.save(upkeep);
    },
}