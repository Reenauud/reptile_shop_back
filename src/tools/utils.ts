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
  username: `${process.env.NODE_ENV === "test" ? process.env.DB_USER_TEST : process.env.DB_USERNAME}`,
  password: `${process.env.NODE_ENV === "test" ? process.env.DB_PASSWORD_TEST : process.env.DB_PASSWORD}`,
  database: `${process.env.NODE_ENV === "test" ? process.env.DB_NAME_TEST : process.env.DB_DATABASE}`,
  synchronize: true,
  entities: [User, Reptile, Order, Food, Equipment, Category, Upkeep],
});
