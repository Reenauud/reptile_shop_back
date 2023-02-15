import { InputType, Field } from "type-graphql";
import "reflect-metadata";
import { Reptile } from "../entities/Reptile";
import { CreateReptileInput } from "./CreateReptileInput";

@InputType()
export class CreateFamilyInput {
    @Field({ nullable: true })
    type!: string;
}