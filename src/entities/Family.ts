import { ObjectType, Field } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { CreateReptileInput } from "../inputs/CreateReptileInput";
import { Reptile } from "./Reptile";

@ObjectType()
@Entity()
export class Family {
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  type!: string;

  @Field(() => [Reptile])
  @OneToMany(() => Reptile, (reptile) => reptile.family, { onDelete: "CASCADE", eager:true })
  reptiles?: Reptile[];
}
