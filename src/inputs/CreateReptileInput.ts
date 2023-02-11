import { InputType, Field } from "type-graphql";
import { Family } from "../entities/Family";
import { CreateFamilyInput } from "./CreateFamilyInput";

@InputType()
export class CreateReptileInput {
    @Field()
    name!: string;

    @Field()
    description!: string;

    @Field()
    price!: number;

    @Field()
    quantity!: number;

    @Field()
    family! : CreateFamilyInput;
}