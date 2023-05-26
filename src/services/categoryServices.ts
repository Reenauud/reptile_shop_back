import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Category } from "../entities/Category";

export const categoryRepository: Repository<Category> = dataSource.getRepository(Category);

export default {
    create: async (name: string): Promise<Category> => {
        let category = new Category();
        category.categoryName = name;
        return await categoryRepository.save(category);
    },

    getOne: async (name: string): Promise<Category> => {
        return await categoryRepository.findOneByOrFail({ categoryName: name});
    },
}