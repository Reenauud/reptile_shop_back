import { Repository } from "typeorm";
import { User, UserRole } from "../entities/User";
import { dataSource } from "../tools/utils";
import * as argon2 from "argon2";

export const userRepository: Repository<User> = dataSource.getRepository(User);

export default {
    getByEmail: async (email: string): Promise<User> => {
        return await userRepository.findOneByOrFail({ email });
    },

    create: async (roles: UserRole , email: string, password: string): Promise<User> => {
        const newUser = new User();
        newUser.roles = roles;
        newUser.email = email;
        newUser.hashedPassword = await argon2.hash(password);

        console.log(newUser);

        return await userRepository.save(newUser);
    },
}