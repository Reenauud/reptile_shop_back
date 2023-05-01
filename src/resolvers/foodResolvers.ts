import { Query, Arg, Resolver, Mutation } from "type-graphql";
import foodServices from "../services/foodServices";
import { Food } from "../entities/Food";
import { CreateFoodInput } from "../inputs/CreateFoodInput";

@Resolver(Food)
export class foodResolvers {
    @Mutation(() => Food)
  async createFood(
    @Arg("food") food: CreateFoodInput,
  ): Promise<Food> {
    return await foodServices.create(food);
  }
}