const frisby = require('frisby');
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8888';

frisby
  .create('GET /healthcheck')
  .get(API_ENDPOINT + '/healthcheck')
  .expectStatus(200)
  .toss();
