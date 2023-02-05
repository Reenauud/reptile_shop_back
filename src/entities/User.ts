import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType } from "type-graphql";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GHOST = "ghost",
}

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        type: "enum",
        enum: UserRole,
        default: [UserRole.GHOST],
    })
    roles!: UserRole

    @Field()
    @Column({ unique: true })
    email!: string

    @Column()
    hashedPassword!: string
}