import { ObjectType, Field } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
} from "typeorm";

@ObjectType()
@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  @Field()
  id?: number;

  @Field()
  @Column()
  equipmentName!: string;

  @Field()
  @Column()
  equipmentDescription!: string;

  @Field()
  @Column(  'decimal', { scale: 2, nullable: true }  )
  equipmentPrice!: number;

  @Field()
  @Column()
  equipmentDetails!: string;

  @Field({ nullable: true })
  @Column()
  equipmentQuantity!: number;

  @Field({ nullable: true })
  @Column()
  equipmentStock!: number;

  @Field()
  @Column({ nullable: true})
  equipmentPicture!: string;
}

