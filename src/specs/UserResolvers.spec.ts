import { ApolloServer, gql } from "apollo-server";
import createServer from "../tools/server";

describe('User resolver', () => {
    let server: ApolloServer;

    beforeAll(async () => {
        server = await createServer();
    });

    it("should create a user and return his email", async () => {
      const createUserQuery = gql`
        mutation CreateUser($password: String!, $email: String!) {
          createUser(password: $password, email: $email) {
            email
          }
      }
      `;

      const response = await server.executeOperation({
          query: createUserQuery,
          variables: {
            password: "cordyceps",
            email: "joel.miller@gmail.com",
          },
        });
        expect(response.data?.createUser).toBeDefined();
    })

    it("should retrieve a user and return his email", async () => {
      const getOneUserQuery = gql`
        query GetOneUser($email: String!) {
          getOneUser(email: $email) {
            email
          }
      }
      `;

      const response = await server.executeOperation({
          query: getOneUserQuery,
          variables: {
            email: "joel.miller@gmail.com"
          },
        });
        expect(response.data?.getOneUser).toBeDefined();
    })

    it("should send an error for unregistered user", async () => {
      const getOneUserQuery = gql`
        query GetOneUser($email: String!) {
          getOneUser(email: $email) {
            email
          }
      }
      `;

      const response = await server.executeOperation({
          query: getOneUserQuery,
          variables: {
            email: "InvalidUser@gmail.com"
          },
        });
        expect(response.errors).toBeDefined();
    })

    it("should return a token", async () => {
      const getTokenMutation = gql`
        mutation GetToken($password: String!, $email: String!) {
          getToken(password: $password, email: $email)
        }
      `;

      const response = await server.executeOperation({
        query: getTokenMutation,
        variables: {
          password: "cordyceps",
          email: "joel.miller@gmail.com",
        },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data?.getToken).toBeDefined();
    });

    it("should send an error for invalid credentials", async () => {
      const getTokenMutation = gql`
        mutation GetToken($password: String!, $email: String!) {
          getToken(password: $password, email: $email)
        }
      `;

      const response = await server.executeOperation({
        query: getTokenMutation,
        variables: {
          password: "dkqsgdqjky",
          email: "joel.miller@gmail.com",
        },
      });

      expect(response.errors).toBeDefined();
    });

  afterAll(async () => {
    const getOneUserQuery = gql`
          query GetOneUser($email: String!) {
            getOneUser(email: $email) {
              id
            }
        }
        `;

    const response = await server.executeOperation({
      query: getOneUserQuery,
      variables: {
        email: "joel.miller@gmail.com"
      },
    });

    await server.executeOperation({
      query: gql`
            mutation DeleteUser($id: Float!) {
              deleteUser(id: $id) {
                id
              }
            }`,
      variables: {
        id: response.data?.getOneUser.id
      },
    });

    await server.stop();
    await new Promise(resolve => setTimeout(() => resolve(''), 500)); // avoid jest open handle error
  });
});
