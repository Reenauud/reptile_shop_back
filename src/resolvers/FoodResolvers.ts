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
      console.log('ici');
      try {
        const foodList = await foodServices.getAll();
        console.log(foodList);
        return foodList;
      } catch (err) {
        throw new Error('Erreur en récupérant la liste des nourritures');
      }
    }
}