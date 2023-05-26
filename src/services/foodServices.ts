import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Food } from "../entities/Food";
import { reptileRepository } from "./reptileServices";
import { categoryRepository } from "./categoryServices";

export const foodRepository: Repository<Food> = dataSource.getRepository(Food);

export default {
    create: async (food: Food): Promise<Food> => {
        return await foodRepository.save(food);
      },
    
    getAll: async (): Promise<Food[]> => {
        return await foodRepository.find();
    },

    getFoodByReptileCategory: async (categoryName: string): Promise<Food[]> => {
        let category = await categoryRepository.findOneByOrFail({ categoryName });
        let reptiles = await reptileRepository.findBy({ category });
        return await foodRepository.findBy({ reptiles });
    }
}