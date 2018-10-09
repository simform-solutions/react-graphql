// data/schema.js


'use strict';

const { ApolloServer } = require('apollo-server-express')

const resolvers = require('./resolvers');

const { gql } = require('apollo-server-express')

// Define our schema using the GraphQL schema language

const typeDefs = gql`
    scalar DateTime

    type User {

        id: Int!

        firstName: String!

        lastName: String

        email: String!,
        
        token: String,
        
        message: String,

        createdAt: DateTime! # will be generated

        updatedAt: DateTime! # will be generated

    }

    type Query {

        allUsers: [User]

        fetchUser(id: Int!): User

    }

    type Mutation {

        login (

            email: String!,

            password: String!

        ): User

        register (

            firstName: String!,

            lastName: String,

            email: String!,

            password: String!

        ): User

    }

`;


module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
