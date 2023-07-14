import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Family } from "./Family";
import { Order } from "./Order";
import { Category } from "./Category";
import { CreateCategoryInput } from "../inputs/CreateCategoryInput";
// import {Category} from "./Category"
// import { CreateCategoryInput } from "../inputs/CreateCategoryInput";

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
  @Column("decimal", { scale: 2, nullable: true })
  price!: number;

  @Field()
  @Column()
  quantity!: number;

  @Field()
  @Column({nullable: true})
  photoId?: string;

  @Field(() => Family)
  @ManyToOne(() => Family, (family) => family.reptiles)
  @JoinColumn({ name: "family_id" })
  family?: Family;


  // @ManyToOne(() => Category, (category) => category.reptiles, {cascade : ["insert"]})
  @ManyToOne(() => Category, (category) => category.reptiles)
  // @JoinColumn({name: "category_id"})
  category?: number;


  @ManyToOne(() => Order, (order) => order.reptileId)
  order?: Order;
}
