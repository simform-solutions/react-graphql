// data/resolvers.js

'use strict';

const { GraphQLScalarType } = require('graphql');

const { Kind } = require('graphql/language');

const { User } = require('../models');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const slugify = require('slugify');

require('dotenv').config();

// Define resolvers

const resolvers = {

  Query: {

    // Fetch all users

    async allUsers() {

      return await User.all();

    },


    // Get a user by it ID

    async fetchUser(_, { id }) {

      return await User.findById(id);

    },

  },

  Mutation: {

    // Handles user login

    async login(_, { email, password }) {

      const user = await User.findOne({ where: { email } });

      if (!user) {

        throw new Error('No user with that email');

      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {

        throw new Error('Incorrect password');

      }

      // Return json web token

      const token = jwt.sign({

        id: user.id,

        email: user.email

      }, process.env.JWT_SECRET, { expiresIn: '1y' });

      user.token = token
      user.message = `Hello, ${user.firstName} ${user.lastName}`

      return user

    },

    // Create new user

    async register(_, { firstName, lastName, email, password }) {

      const user = await User.create({

        firstName,

        lastName,

        email,

        password: await bcrypt.hash(password, 10)

      });

      // Return json web token

      const token = jwt.sign({

        id: user.id,

        email: user.email

      }, process.env.JWT_SECRET, { expiresIn: '1y' });

      user.token = token
      user.message = `Hello, ${user.firstName} ${user.lastName}`

      return user

    },

  },

  DateTime: new GraphQLScalarType({

    name: 'DateTime',

    description: 'DateTime type',

    parseValue(value) {

      // value from the client

      return new Date(value);

    },

    serialize(value) {

      const date = new Date(value);

      // value sent to the client

      return date.toISOString();

    },

    parseLiteral(ast) {

      if (ast.kind === Kind.INT) {

        // ast value is always in string format

        return parseInt(ast.value, 10);

      }

      return null;

    }

  })
}

// Define mutations



module.exports = resolvers;
