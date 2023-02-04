import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    role!: string

    @Field()
    @Column({ unique: true })
    email!: string
}