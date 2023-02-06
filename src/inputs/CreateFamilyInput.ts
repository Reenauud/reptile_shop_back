import { InputType, Field } from "type-graphql";

@InputType()
export class CreateFamilyInput {
    id?: number

    @Field()
    type!: string
}