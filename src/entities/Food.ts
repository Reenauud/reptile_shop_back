import { ObjectType, Field } from "type-graphql";
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Reptile } from "./Reptile";

@ObjectType()
@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  @Field()
  id?: number;

  @Column()
  @Field()
  foodName!: string;

  @Column( 'decimal', { scale: 2, nullable: true } )
  @Field()
  foodPrice!: number;

  @Column()
  @Field()
  foodCategory!: string;

  
  @ManyToMany(() => Reptile)
  @JoinTable()
  reptiles?: Reptile[];
}