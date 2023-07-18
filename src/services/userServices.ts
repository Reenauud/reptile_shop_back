import { Repository } from "typeorm";
import { User, UserRole } from "../entities/User";
import { dataSource } from "../tools/utils";
import * as argon2 from "argon2";

export const userRepository: Repository<User> = dataSource.getRepository(User);

export default {
  getAll: async (): Promise<User[] | any> => {
    return await userRepository.find();
  },

  getByEmail: async (email: string): Promise<User> => {
    return await userRepository.findOneByOrFail({ email });
  },

  create: async (
    email: string,
    password: string
  ): Promise<User> => {
    const newUser = new User();
    newUser.email = email;
    newUser.hashedPassword = await argon2.hash(password);
    newUser.role = UserRole.USER;

    console.log(newUser);

    return await userRepository.save(newUser);
  },

  delete: async (
    email: string,
  ): Promise<string> => {
    const userToDelete = await userRepository.findOneByOrFail({ email });
    await userRepository.delete(userToDelete);
    return "ok";
  },
};
