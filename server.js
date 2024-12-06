const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('./db');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startApolloServer() {
  await server.start();
server.applyMiddleware({ app });
}

startApolloServer();

const PORT = 4000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});