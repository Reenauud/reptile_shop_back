import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Reptile } from "../entities/Reptile";
import { Order } from "../entities/Order";
import { Food } from "../entities/Food";
import { Equipment } from "../entities/Equipment";
import { Upkeep } from "../entities/Upkeep";
import { Category } from "../entities/Category";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "gregrun",
  password: "example",
  database: "reptiles",
  synchronize: true,
  entities: [User, Reptile, Order, Food, Equipment, Category, Upkeep],
});
