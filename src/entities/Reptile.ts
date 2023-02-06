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

  @ManyToOne(() => Reptile, (reptiles) => reptiles.family)
  family!: Family;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column()
  quantity!: number;
}
