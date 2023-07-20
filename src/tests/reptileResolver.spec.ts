import { ApolloServer, gql } from "apollo-server";
import createServer from "../tools/server";

describe("Reptile resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should create a reptile", async () => {
    const createReptileMutation = gql`
    mutation CreateReptile($reptile: CreateReptileInput!) {
      createReptile(reptile: $reptile) {
        name
      }
    }
    `;

    const reptile = {
        name: "Boa",
        scientificName: "Boa constrictor",
        description: "7 mètres",
        price: 300.00,
        quantity: 1,
    };

    const response = await server.executeOperation({
      query: createReptileMutation,
      variables: {
        reptile: reptile,
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.createReptile).toBeDefined();
  })
});