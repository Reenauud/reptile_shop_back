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
export class Family {
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  type!: string;

  @OneToMany(() => Family, (family) => family.reptiles)
  reptiles?: Reptile[];
}
