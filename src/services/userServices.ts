import { Repository } from "typeorm";
import { User } from "../entities/User";
import { dataSource } from "../tools/utils";

export const userRepository: Repository<User> = dataSource.getRepository(User);

export default {
    getByEmail: async (email: string): Promise<User> => {
        return await userRepository.findOneByOrFail({ email });
    },
}