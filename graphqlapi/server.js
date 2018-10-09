// server.js

'use strict';
const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const APP = express();

// Imports: GraphQL
const { typeDefs, resolvers } = require('./data/schema.js');

const SERVER = new ApolloServer({

  typeDefs: typeDefs,

  resolvers: resolvers,

  playground: {
    endpoint: `http://localhost:3001/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }

});

// Middleware: GraphQL
SERVER.applyMiddleware({
  app: APP
});

// Express: Port
const PORT = 3001 || process.env;

// Express: Listener
APP.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});

// Exports
module.exports = APP;
