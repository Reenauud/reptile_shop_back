import { InputType, Field } from "type-graphql";
import "reflect-metadata";

@InputType()
export class CreateFoodInput {
    @Field()
    foodName!: string;

    @Field()
    foodCategory!: string;

    @Field()
    foodPrice!: number;
}