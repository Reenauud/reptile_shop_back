import { Query, Arg, Resolver } from "type-graphql";
import { User } from "../entities/User";
import userServices from "../services/userServices";

@Resolver(User)
export class UserResolver {
    @Query(() => User)
    async getOneUser(
        @Arg("email") email: string,
    ): Promise<User> {
        try {
            const user = await userServices.getByEmail(email);
            return user;
        } catch (e) {
            throw new Error(`Aucun utilisateur avec l'email : ${email}`)
        }
    }
}