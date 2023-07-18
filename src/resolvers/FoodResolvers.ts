import { Query, Arg, Resolver, Mutation } from "type-graphql";
import foodServices from "../services/foodServices";
import { Food } from "../entities/Food";
import { CreateFoodInput } from "../inputs/CreateFoodInput";

@Resolver(Food)
export class FoodResolvers {
    @Mutation(() => Food)
  async createFood(
    @Arg("food") food: CreateFoodInput,
  ): Promise<Food> {
    return await foodServices.create(food);
  }

    @Query(() => [Food])
    async getFoodList()
    : Promise<Food[]> {
      try {
        const foodList = await foodServices.getAll();
        return foodList;
      } catch (err) {
        throw new Error("Erreur en récupérant la liste des nourritures");
      }
    }

    @Query(() => [Food])
    async getFoodFiltered(
      @Arg("filter") filter: string,
    ): Promise<Food[]> {
      try {
        let foodList = await foodServices.getFoodByFilter(filter);
        return foodList.length > 0 ? foodList : [];
      } catch (err) {
        throw new Error("Erreur en recherchant la liste de nourriture avec filtre");
      }
    }
}