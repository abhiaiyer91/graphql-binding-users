import faker from "faker";
import { reduce } from 'lodash';
import { Binding } from "graphql-binding";
import { makeExecutableSchema } from "graphql-tools";

const users = {};

const schema = `
  type User {
    id: ID!
    name: String
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: () => {
      return reduce(
        users,
        (memo, currentVal) => {
          if (currentVal) {
            memo.push(currentVal);
          }

          return memo;
        },
        []
      );
    }
  },
  Mutation: {
    createUser: (root, { name }) => {
      const id = faker.random.uuid();
      const user = {
        id,
        name
      };

      users[id] = user;

      return user;
    }
  }
};

export default new Binding({
  schema: makeExecutableSchema({
    typeDefs: schema,
    resolvers
  })
});
