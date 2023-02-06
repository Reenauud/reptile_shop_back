import { InputType, Field } from "type-graphql";
import { Reptile } from "../entities/Reptile";

@InputType()
export class CreateFamilyInput {
  id?: number;

  @Field()
  type!: string;

  reptiles?: Reptile[];
}
