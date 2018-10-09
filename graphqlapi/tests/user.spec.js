const { expect } = require('chai');
const userApi = require('./api');

describe('User Mutation', () => {
  describe('Register', () => {
    it('Register a user and return First Name, token and message', async () => {
      const expectedResult = {
        "data": {
          "register": {
            "firstName": "Rutvik",
            "lastName": "Bhatt",
            "message": "Hello, Rutvik Bhatt"
          }
        }
      }

      const result = await userApi.register({ "firstName": "Rutvik", "lastName": "Bhatt", "email": "rutvik@simfrom.com", "password": "rutvik" });
      expect(result.data).to.eql(expectedResult);
    });
  });
  describe('Login', () => {
    it('Login user and return message', async () => {
      const expectedResult = {
        "data": {
          "login": {
            "message": "Hello, Rutvik Bhatt"
          }
        }
      }

      const result = await userApi.login({ "email": "rutvik@simfrom.com", "password": "rutvik" });
      expect(result.data).to.eql(expectedResult);
    });
  })

});
