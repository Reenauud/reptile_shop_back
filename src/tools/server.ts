import { ApolloServer } from "apollo-server";
import { dataSource } from "./utils";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../resolvers/userResolvers";
import { ReptileResolvers } from "../resolvers/reptileResolvers";
import { FamilyResolvers } from "../resolvers/familyResolvers";

async function createServer(): Promise<ApolloServer> {
  dotenv.config();
  await dataSource.initialize();
  const schema = await buildSchema({
    validate: { forbidUnknownValues: false },
    resolvers: [UserResolver, ReptileResolvers, FamilyResolvers],
    //   authChecker: ({ context }, roles) => {
    //     console.log("CONTEXT", context);
    //     console.log("ROLES", roles);

    //     if (context.user === undefined) {
    //       return false;
    //     }
    //     if (roles.length === 0 || roles.includes(context.user.role)) {
    //       return true;
    //     }

    //     return false;
    //   },
  });
  return new ApolloServer({
    schema,
    //   context: ({ req }) => {
    //     if (
    //       req?.headers.authorization === undefined ||
    //       process.env.JWT_SECRET_KEY === undefined
    //     ) {
    //       return {};
    //     } else {
    //       try {
    //         const bearer = req.headers.authorization.split("Bearer ")[1];
    //         const userPayload = authServices.verifyToken(bearer);

    //         return { user: userPayload };
    //       } catch (e) {
    //         console.log(e);
    //         return {};
    //       }
    //     }
    //   },
  });
}

export default createServer;
