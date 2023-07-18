import { ObjectType, Field } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
	OneToOne,
  JoinColumn,
} from "typeorm";
import { Reptile } from "./Reptile";

export enum RaiseRate {
    LOW = "Facile",
    AVG = "Moyen",
    HIGH = "Difficile",
  }

@ObjectType()
@Entity()
export class Upkeep {

  @PrimaryGeneratedColumn()
  @Field()
	id!: number;

	@Field()
	@Column({
	type: "enum",
	enum: RaiseRate,
	default: [RaiseRate.LOW],
  })
  difficulty!: RaiseRate;
  
  @Field()
  @Column({ nullable: true })
  location!: string;

	@Field()
  @Column({ nullable: true })
  eatingPlan!: string;

	@Field()
  @Column({ nullable: true })
  dayCycle!: string;

  @Field()
  @Column({ nullable: true })
  hygrometry!: string;

  @Field()
  @Column({ nullable: true })
  dayTemperature!: string;
	
	@Field()
  @Column({ nullable: true })
  nightTemperature!: string;

  @Field()
  @Column()
  upkeepInformations!: string;

	@OneToOne(() => Reptile, (reptile) => reptile.upkeep)
  @JoinColumn({ name: "reptile_id"})
	reptileId!: Reptile;
}