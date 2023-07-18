import { InputType, Field } from "type-graphql";
import "reflect-metadata"
import { Category } from "../entities/Category";
import { CreateCategoryInput } from "./CreateCategoryInput";
// import { CreateCategoryInput } from "./CreateCategoryInput";
// import { Category } from "../entities/Category";

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

    // @Field({nullable: true})
    // category? : number;

    @Field({nullable: true})
    photoId? : string;


}