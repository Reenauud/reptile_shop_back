import { InputType, Field } from "type-graphql";
import "reflect-metadata";

@InputType()
export class CreateFamilyInput {
    @Field({ nullable: true })
    type!: string;
}