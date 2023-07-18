import { InputType, Field } from "type-graphql";
import "reflect-metadata";
import { RaiseRate } from "../entities/Upkeep";

@InputType()
export class CreateUpkeepInput {
    @Field({ nullable: true })
    difficulty!: RaiseRate;

    @Field({ nullable: true })
    location!: string;

    @Field({ nullable: true })
    eatingPlan!: string;

	@Field({ nullable: true })
    dayCycle!: string;

    @Field({ nullable: true })
    hygrometry!: string;

    @Field({ nullable: true })
    dayTemperature!: string;

    @Field({ nullable: true })
    nightTemperature!: string;

    @Field({ nullable: true })
    upkeepInformations!: string;
}