import { InputType, Field } from "type-graphql";
import "reflect-metadata"
import { Family } from "../entities/Family";
import { CreateFamilyInput } from "./CreateFamilyInput";

@InputType()
export class CreateReptileInput {
    @Field({ nullable: true })
    name!: string;

    @Field({ nullable: true })
    description!: string;

    @Field({ nullable: true })
    price!: number;

    @Field({ nullable: true })
    quantity!: number;
}