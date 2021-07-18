import supertest from 'supertest';
import { credentials, urls } from '../config';

export const Client = function () {
  this.list = async function () {
    const r = await supertest(`${urls.baseUrl}`)
      .get('/clients')
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password);
    return r;
  };

  this.create = async function (clientType) {
    const clientData = `{
      "name": "John Smith",
      "company": "Plesk",
      "login": "john-unit-test${Math.floor(Math.random() * 10000)}",
      "status": 0,
      "email": "john_smith@msn.com",
      "locale": "en-US",
      "owner_login": "admin",
      "external_id": "link:12345",
      "description": "Nice guy",
      "password": "changeme1Q**",
      "type": "${clientType}"
    }`;
    const r = await supertest(`${urls.baseUrl}`)
      .post('/clients')
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password)
      .send(clientData);
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
