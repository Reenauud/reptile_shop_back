import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Food } from "../entities/Food";

export const foodRepository: Repository<Food> = dataSource.getRepository(Food);

export default {
    create: async (food: Food): Promise<Food> => {
        return await foodRepository.save(food);
      },
}