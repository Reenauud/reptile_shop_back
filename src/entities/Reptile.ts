import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Family } from "./Family";

@ObjectType()
@Entity()
export class Reptile{
    @PrimaryGeneratedColumn()
    id? : number

    @Field()
    @Column()
    name!: string

    @Field()
    @ManyToOne(() => Family, (family) => family.reptiles)
    family!: Family

    @Field()
    @Column()
    description!: string

    @Field()
    @Column()
    price!: number

    @Field()
    @Column()
    quantity!: number
}