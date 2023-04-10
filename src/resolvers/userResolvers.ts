import { Query, Arg, Resolver, Mutation } from "type-graphql";
import { User, UserRole } from "../entities/User";
import userServices from "../services/userServices";
import authServices from "../services/authServices";
import { userRepository } from "../services/userServices";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async getOneUser(@Arg("email") email: string): Promise<any> {
    try {
      const user = await userServices.getByEmail(email);
      return user;
    } catch (e) {
      throw new Error(`Aucun utilisateur avec l'email : ${email}`);
    }
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await userServices.getAll();
      return users;
    } catch (e: any) {
      throw new Error("Erreur en recherchant tous les utilisateurs");
    }
  }
  @Query(() => User)
  async getUserById(@Arg("id") id: number): Promise<User> {
    try {
      const users = await userRepository.findOneByOrFail({ id });
      return users;
    } catch (e: any) {
      throw new Error("Erreur en recherchant tous les utilisateurs");
    }
  }
  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("role") role: UserRole,
  ): Promise<User> {
    try {
      const user = await userServices.create(role, email, password);
      return user;
    } catch (e: any) {
      throw new Error("Erreur pendant la création de l'utilisateur");
    }
  }

  @Mutation(() => String)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String> {
    try {
      // Récupérer l'utilisateur dans la bdd suivant l'email
      const user = await userServices.getByEmail(email);
      console.log(user);
      // Vérifier que ce sont les même mots de passe
      if (await authServices.verifyPassword(password, user.hashedPassword)) {
        // Créer un nouveau token => signer un token
        const token = authServices.signJwt({
          email: user.email,
          id: user.id,
        });

        return token;
      } else {
        throw new Error();
      }
    } catch (e) {
      throw new Error("Invalid credentials");
    }
  }

  @Mutation(() => String)
  async deleteUser(
    @Arg("email") email: string
  ): Promise<string> {
    return await userServices.delete(email);
  }
}
