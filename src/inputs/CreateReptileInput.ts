import { Reptile } from "../entities/Reptile";
import { InputType, Field } from "type-graphql";
import { Family } from "../entities/Family";

@InputType()
export class CreateReptileInput {
  @Field()
  name!: string;

  @Field()
  family!: Family;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field()
  quantity!: number;
}
