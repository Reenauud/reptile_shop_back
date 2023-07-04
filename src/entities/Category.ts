import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Reptile } from "./Reptile";
import { CreateReptileInput } from "../inputs/CreateReptileInput";


export enum CategoryName {
    SNAKE = "Serpents",
    AMPH = "Amphibiens",
    LIZARD = "Lezards",
    TORTLE = "Tortues",
    INVERT = "Invertébrés"
  }

@ObjectType()
@Entity()

export class Category{

  @Field()
    @PrimaryGeneratedColumn()
    id?: number


    @Field()
    @Column({
        type: "enum",
        enum: CategoryName,
        unique: true,
      })
      categoryName!: string;
  


  @OneToMany(() => Reptile, (reptile) => reptile.category)
  reptiles?: Reptile[];
}