import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Category, CategoryName } from "../entities/Category";

export const categoryRepository: Repository<Category> = dataSource.getRepository(Category);

export default {
    create: async (categoryName: CategoryName): Promise<Category> => {
        let category = new Category();
        category.categoryName = categoryName;
        return await categoryRepository.save(category);
    },

    getOne: async (categoryName: CategoryName): Promise<Category> => {
        return await categoryRepository.findOneByOrFail({ categoryName });
    },

    getAll: async (): Promise<Category[]> => {
        return await categoryRepository.find();
    },
}