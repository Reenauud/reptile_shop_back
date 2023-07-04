import { Query, Arg, Resolver, Mutation } from "type-graphql";
import { Reptile } from "../entities/Reptile";
import { CreateReptileInput } from "../inputs/CreateReptileInput";
import reptileServices from "../services/reptileServices";
import { REFUSED } from "dns";
import { CreateCategoryInput } from "../inputs/CreateCategoryInput";
import { Category, CategoryName } from "../entities/Category";
import categoryServices from "../services/categoryServices";

@Resolver(Category)
export class CategoryResolvers {
  @Mutation(() => Category)
  async createCategory(
    @Arg("category") category: CreateCategoryInput
  ): Promise<Category> {
    console.log(category);
    return await categoryServices.create(category);
  };

  @Query(()=> [Category])
  async getAllCategory():Promise<Category[] | undefined>{
    try {
      const categories = await categoryServices.getAll()

      return categories
      
    } catch (error) {

      console.log(error)
      
    }

  }

  @Query(()=> Category)
  async getCategoryByName(
    @Arg("categoryName") CategoryName : string
  ):Promise<Category> {
      const category = await categoryServices.getByName(CategoryName)
      const id = category.id
      console.log(id)
      return category 
  }

  

}