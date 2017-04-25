const chakram = require('chakram');
const expect = chakram.expect;
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8888';

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'jwt_development_secret';

describe('authorize endpoint', () => {
  describe('POST /authorize', () => {
    it('should respond with an access token on successful authorization', () => {
      return chakram.post(API_ENDPOINT + '/authorize', {
        email: 'foo@bar.com',
        password: 'password'
      }).then((response) => {
        expect(response).to.have.status(200);
        expect(response).to.comprise.of.json({
          status: 200,
        });
        expect(response.body.token).to.exist;
        const payload = jwt.verify(response.body.token, jwtSecret);
        expect(payload.userId).to.equal(1);
      });
    });

    it('should respond with 401 if no matching user for the supplied email can be found', () => {
      const response = chakram.post(API_ENDPOINT + '/authorize', {
        email: 'bar@foo.com',
        password: 'password'
      });
      expect(response).to.have.status(401);
      expect(response).to.comprise.of.json({
        status: 401,
        message: 'Not authorized'
      });
      return chakram.wait();
    });

    it('should respond with 401 password does not match', () => {
      const response = chakram.post(API_ENDPOINT + '/authorize', {
        email: 'foo@bar.com',
        password: '12345'
      });
      expect(response).to.have.status(401);
      expect(response).to.comprise.of.json({
        status: 401,
        message: 'Not authorized'
      });
      return chakram.wait();
    });
  });
});