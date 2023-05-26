import { Query, Arg, Resolver, Mutation } from "type-graphql";
import categoryServices from "../services/categoryServices";
import { Category } from "../entities/Category";

@Resolver(Category)
export class CategoryResolvers {
    @Mutation(() => Category)
    async createCategory(
        @Arg("name") name: string,
    ): Promise<Category> {
        try {
            let newCategory: Category = await categoryServices.create(name);
            return newCategory;
        } catch (err: any) {
            throw new Error("Erreur en créant la catégorie");
        }
    }

    @Query(() => Category)
    async getCategory(
        @Arg("name") name: string,
    ): Promise<Category> {
        try {
            let category = await categoryServices.getOne(name);
            return category;
        } catch (err: any) {
            throw new Error("Aucune catégorie trouvée");
        }
    }
}