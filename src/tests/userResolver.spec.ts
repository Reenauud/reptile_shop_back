import { ApolloServer, gql } from "apollo-server";
import createServer from "../tools/server";

describe("User resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should retrieve a token", async () => {
    const getTokenMutation = gql`
      mutation GetToken($password: String!, $email: String!) {
        getToken(password: $password, email: $email)
      }
    `;

    const response = await server.executeOperation({
      query: getTokenMutation,
      variables: {
        password: "1234",
        email: "dieumegard@gmail.fr",
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.getToken).toBeDefined();
  });
});
