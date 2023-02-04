import { DataSource } from "typeorm";
import { User } from "../entities/User";


export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "gregrun",
  password: "example",
  database: "reptiles",
  synchronize: true,
  entities: [
    User
  ],
});