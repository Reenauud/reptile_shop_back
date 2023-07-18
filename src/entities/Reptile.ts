import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Family } from "./Family";
import { Order } from "./Order";
import { Upkeep } from "./Upkeep";
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

  @Field(() => Upkeep)
  @OneToOne(() => Upkeep, (upkeep) => upkeep.reptileId, { cascade: true, onUpdate: "CASCADE", eager: true })
  @JoinColumn({ name: "upkeep_id"})
  upkeep?: Upkeep;


  // @ManyToOne(() => Category, (category) => category.reptiles, {cascade : ["insert"]})
  @ManyToOne(() => Category, (category) => category.reptiles)
  // @JoinColumn({name: "category_id"})
  category?: Category;


  @ManyToOne(() => Order, (order) => order.reptileId)
  order?: Order;
}
