import supertest from 'supertest';
import { credentials, urls } from '../config';

export const Cli = function () {
  this.commands = async function (password = credentials.password) {
    const r = await supertest(`${urls.baseUrl}`)
      .get('/cli/commands')
      .set('Accept', 'application/json')
      .auth(credentials.login, password);
    return r;
  };

  this.ref = async function (command) {
    const r = await supertest(`${urls.baseUrl}`)
      .get(`/cli/${command}/ref`)
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password);
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
