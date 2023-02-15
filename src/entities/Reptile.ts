import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Family } from "./Family";

@ObjectType()
@Entity()
export class Reptile {
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description!: string;
  
  @Field()
  @Column()
  price!: number;
  
  @Field()
  @Column()
  quantity!: number;

  @Field(() => Family)
  @ManyToOne(() => Family, (family) => family.reptiles)
  @JoinColumn({ name: "family_id"})
  family?: Family;
}
