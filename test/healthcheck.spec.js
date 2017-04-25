const chakram = require('chakram');
const expect = chakram.expect;
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8888';

describe('GET /healthcheck', () => {
  it('should respond with a 200 status code and success JSON message', () => {
    var response = chakram.get(API_ENDPOINT + '/healthcheck');
    expect(response).to.have.status(200);
    expect(response).to.comprise.of.json({
      status: 200,
      message: 'OK'
    });
    return chakram.wait();
  });
});
