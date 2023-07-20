import { ApolloServer, gql } from "apollo-server";
import createServer from "../tools/server";

describe("User resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should create a user", async () => {
    const createUserMutation = gql`
    mutation CreateUser($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        email
      }
    }
    `;

    const response = await server.executeOperation({
      query: createUserMutation,
      variables: {
        email: "greg.dieum@gmail.fr",
        password: "1234",
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.createUser).toBeDefined();
  })

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
        email: "greg.dieum@gmail.fr",
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.getToken).toBeDefined();
  });

  it("should delete a user", async () => {
    const deleteUserMutation = gql`
    mutation DeleteUser($email: String!) {
      deleteUser(email: $email) 
    }`

    const response = await server.executeOperation({
      query: deleteUserMutation,
      variables: {
        email: "greg.dieum@gmail.fr",
      }
    })

    expect(response.errors).toBeUndefined();
    expect(response.data?.deleteUser).toBeDefined();
  })

  
});
