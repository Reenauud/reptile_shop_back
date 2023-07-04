import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Category, CategoryName } from "../entities/Category";
import { CaaRecord } from "dns";
import { ID } from "type-graphql";

export const categoryRepository: Repository<Category> = dataSource.getRepository(Category);

export default {
    create: async (category: Category): Promise<Category> => {
        return await categoryRepository.save(category);
      },

    getAll: async (): Promise<Category[]> => {
        return await categoryRepository.find()
    },

    getByName: async (CategoryName: string): Promise<Category> => {
        return await categoryRepository.findOneByOrFail({categoryName: CategoryName})
    }
}