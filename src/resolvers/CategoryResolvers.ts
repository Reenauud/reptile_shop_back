import { Query, Arg, Resolver, Mutation } from "type-graphql";
import categoryServices from "../services/categoryServices";
import { Category, CategoryName } from "../entities/Category";

@Resolver(Category)
export class CategoryResolvers {
    @Mutation(() => Category)
    async createCategory(
        @Arg("categoryName") categoryName: CategoryName,
    ): Promise<Category> {
        try {
            let newCategory: Category = await categoryServices.create(categoryName);
            return newCategory;
        } catch (err: any) {
            throw new Error("Erreur en créant la catégorie");
        }
    }

    @Query(() => Category)
    async getCategory(
        @Arg("categoryName") categoryName: CategoryName,
    ): Promise<Category> {
        try {
            let category = await categoryServices.getOne(categoryName);
            return category;
        } catch (err: any) {
            throw new Error("Aucune catégorie trouvée");
        }
    }

    @Query(() => [Category])
    async getAllCategories(
    ): Promise<Category[]> {
        try {
            let categories = await categoryServices.getAll();
            return categories;
        } catch (err: any) {
            throw new Error("Aucune catégorie trouvée");
        }
    }

}