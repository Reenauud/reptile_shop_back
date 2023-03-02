import { Field, ObjectType } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./User";
import { Reptile } from "./Reptile";

@ObjectType()
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Field(() => User)
  @ManyToOne(() => User)
  userId?: User;

  @Field(() => Reptile)
  @ManyToOne(() => Reptile)
  reptileId?: Reptile;

  @Column()
  totalPrice?: number;
}
