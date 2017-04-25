
const chakram = require('chakram');
const expect = chakram.expect;
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8888';

describe('user endpoint', () => {
  describe('POST /user', () => {
    it('should respond with a 200 status and the new user', () => {
      const response = chakram.post(API_ENDPOINT + '/user', {
        name: 'Foo Bar',
        email: 'foo@bar.com',
        password: 'password'
      });
      expect(response).to.have.status(200);
      expect(response).to.comprise.of.json({
        id: 1,
        name: 'Foo Bar',
        email: 'foo@bar.com'
      });
      return chakram.wait();
    });

    it('should respond with a 409 status when attempt to create a new user with an existing email', () => {
      const response = chakram.post(API_ENDPOINT + '/user', {
        name: 'Foo Bar',
        email: 'foo@bar.com',
        password: 'password'
      });
      expect(response).to.have.status(409);
      expect(response).to.comprise.of.json({
        status: 409,
        message: 'Unique constraint error',
        errorData: {
          errors: [{
            message: 'email must be unique',
            type: 'unique violation',
            path: 'email',
            value: 'foo@bar.com'
          }],
          fields: {
            email: 'foo@bar.com'
          }
        }
      });
      return chakram.wait();
    });

    it('should respond with a 422 status when name and/or password are missing', () => {
      const response = chakram.post(API_ENDPOINT + '/user', {
        name: '',
        email: 'foo@bar.com',
        password: ''
      });
      expect(response).to.have.status(422);
      expect(response).to.comprise.of.json({
        status: 422,
        message: 'Validation error',
        errorData: {
          errors: [{
            message: 'Validation notEmpty failed',
            type: 'Validation error',
            path: 'name',
            value: {},
            __raw: {}
          }, {
            message: 'Validation notEmpty failed',
            type: 'Validation error',
            path: 'password',
            value: {},
            __raw: {}
          }]
        }
      });
      return chakram.wait();
    });

    it('should respond with a 422 status when email is not valid format', () => {
      const response = chakram.post(API_ENDPOINT + '/user', {
        name: 'Foo Bar',
        email: 'foobar.com',
        password: 'password'
      });
      expect(response).to.have.status(422);
      expect(response).to.comprise.of.json({
        status: 422,
        message: 'Validation error',
        errorData: {
          errors: [{
            message: 'Validation isEmail failed',
            type: 'Validation error',
            path: 'email',
            value: {},
            __raw: {}
          }]
        }
      });
      return chakram.wait();
    });
  });
});