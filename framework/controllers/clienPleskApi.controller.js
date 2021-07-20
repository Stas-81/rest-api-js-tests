import supertest from 'supertest';
import { credentials, urls } from '../config';
import { clientData } from '../config/testData';

export const Client = function () {
  this.list = async function () {
    const r = await supertest(`${urls.baseUrl}`)
      .get('/clients')
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password);
    return r;
  };

  this.create = async function (clientType) {
    const r = await supertest(`${urls.baseUrl}`)
      .post('/clients')
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password)
      .send(clientData(clientType));
    return r;
  };

  this.call = async function (command, params) {
    const r = await supertest(`${urls.baseUrl}`)
      .post(`/cli/${command}/call`)
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password)
      .send(`{ "params": [ ${params} ]}`);
    return r;
  };
};
