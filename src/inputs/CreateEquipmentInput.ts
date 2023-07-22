import { InputType, Field } from "type-graphql";
import "reflect-metadata";

@InputType()
export class CreateEquipmentInput {
    @Field()
    equipmentName!: string;

    @Field()
    equipmentDescription!: string;

    @Field()
    equipmentPrice!: number;

    @Field()
    equipmentDetails!: string;

    @Field()
    equipmentPicture!: string;
}