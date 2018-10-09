const axios = require('axios');

const API_URL = 'http://localhost:3001/graphql';

const register = async variables =>
    axios.post(API_URL, {
      query: `
      mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        register(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
          firstName
          lastName
          message
        }
      }
    `,
      variables,
    });

const login = async variables =>
    axios.post(API_URL, {
      query: `
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          message
        }
      }
    `,
      variables,
    });

module.exports = {
  register: register,
  login: login
}
