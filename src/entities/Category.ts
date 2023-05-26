import { ObjectType, Field } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Reptile } from "./Reptile";

@ObjectType()
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column()
    categoryName!: string;

    @Field(() => [Reptile])
    @OneToMany(() => Reptile, (reptiles) => reptiles.category, { onDelete: "CASCADE", eager:true })
    reptiles?: Reptile[];
}   