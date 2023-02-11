import { InputType, Field } from "type-graphql";

@InputType()
export class CreateFamilyInput {
    @Field()
    type!: string;
}