import { ObjectType, Field } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Reptile } from "./Reptile";

export enum CategoryName {
  SNAKE = 'Serpents',
  AMPH = 'Amphibiens',
  TORT = 'Tortues',
  LIZ = 'Lézards',
  INV = 'Invertébrés',
}

@ObjectType()
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    @Field()
    id?: number;

    @Field()
    @Column({ unique: true, type: "enum", enum: CategoryName })
    categoryName!: CategoryName;

    @Field()
    @Column({nullable: true})
    categoryImage?: string

    @OneToMany(() => Reptile, (reptiles) => reptiles.category, { onDelete: "CASCADE" })
    reptiles?: Reptile[];
}   
