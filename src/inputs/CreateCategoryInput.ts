import { InputType, Field } from "type-graphql";
import "reflect-metadata";
import { Category } from "../entities/Category";
import { Reptile } from "../entities/Reptile";

@InputType()
export class CreateCategoryInput{

    @Field()
    categoryName!: string;

    // @Field({ nullable: true })
    // reptile!: Reptile
    
    @Field()
    categoryImage!: string;



}

// export class CreateFamilyInput {
//     @Field({ nullable: true })
//     type!: string;
