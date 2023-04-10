import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Order } from "./Order";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GHOST = "ghost",
}

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: UserRole,
    default: [UserRole.GHOST],
  })
  role!: UserRole;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  hashedPassword!: string;

  @ManyToOne(() => Order, (order) => order.userId)
  order?: Order;
}
