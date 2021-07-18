import supertest from 'supertest';
import { credentials, urls } from '../config';
import { domainData } from '../config/testData';

export const Domain = function () {
  this.list = async function () {
    const r = await supertest(`${urls.baseUrl}`)
      .get('/domains')
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password);
    return r;
  };

  this.create = async function () {
    const r = await supertest(`${urls.baseUrl}`)
      .post('/domains')
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password)
      .send(domainData);
    return r;
  };

  this.delete = async function (id) {
    const r = await supertest(`${urls.baseUrl}`)
      .delete(`/domains/${id}`)
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password);
    return r;
  };

  this.detail = async function (id) {
    const r = await supertest(`${urls.baseUrl}`)
      .get(`/domains/${id}`)
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password);
    return r;
  };

  this.clientList = async function (id) {
    const r = await supertest(`${urls.baseUrl}`)
      .get(`/domains/${id}/client`)
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password);
    return r;
  };

  this.status = async function (id) {
    const r = await supertest(`${urls.baseUrl}`)
      .get(`/domains/${id}/status`)
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password);
    return r;
  };

  this.suspend = async function (id) {
    const r = await supertest(`${urls.baseUrl}`)
      .put(`/domains/${id}/status`)
      .set('Accept', 'application/json')
      .auth(credentials.login, credentials.password)
      .send('{ "status": "suspended"}');
    return r;
  };
};
