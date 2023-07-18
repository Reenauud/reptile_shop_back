import { Field, ObjectType } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";

import { User } from "./User";
import { Reptile } from "./Reptile";
import { Food } from "./Food";
import { Equipment } from "./Equipment";

@ObjectType()
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Field(() => User)
  @ManyToOne(() => User)
  userId?: User;

  @Field(() => Reptile, { nullable: true})
  @ManyToMany(() => Reptile)
  reptileId?: Reptile;

  @Field(() => Food, { nullable: true})
  @ManyToMany(() => Food)
  foodId?: Food;

  @Field(() => Equipment, { nullable: true})
  @ManyToMany(() => Equipment)
  equipmentId?: Equipment;

  @Column()
  totalPrice?: number;
}
