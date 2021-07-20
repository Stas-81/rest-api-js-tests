import { expect } from '@jest/globals';
import { Client, Domain, Cli } from '../framework/controllers/index';

let domainId = null;

describe('Plesk RESTful API js tests', () => {
  it('should be able get list of CLI commands', async () => {
    const r = await new Cli().commands();
    expect(r.status)
      .toEqual(200);
    expect(r.body)
      .toContain('server_pref');
    expect(r.body.length)
      .toBeGreaterThan(50);
    expect(r.headers)
      .toHaveProperty('server', 'sw-cp-server');
  });

  it('should not get unauthorized accress', async () => {
    const r = await new Cli().commands('wrong_password');
    expect(r.status)
      .toEqual(401);
  });

  it('should be able get reference for command', async () => {
    const r = await new Cli().ref('settings');
    expect(r.status)
      .toEqual(200);
    expect(r.body)
      .toHaveProperty('allowed_commands');
    expect(r.body)
      .toHaveProperty('allowed_options');
  });

  it('should be able call command with params', async () => {
    const r = await new Cli().call('settings', '"--get", "FullHostName"');
    expect(r.status)
      .toEqual(200);
    expect(r.body)
      .toHaveProperty('stdout');
    expect(r.body)
      .toHaveProperty('code');
  });

  it('should be able get list of clients', async () => {
    const r = await new Client().list();
    expect(r.status)
      .toEqual(200);
    expect(r.body[0])
      .toHaveProperty('login');
    expect(r.body[0])
      .toHaveProperty('id');
    expect(r.body[0])
      .toHaveProperty('type');
  });

  it('should not be able create new client', async () => {
    const r = await new Client().create('customer');
    expect(r.status)
      .toEqual(500);
    expect(r.body)
      .toHaveProperty('message', 'You cannot manage customers due to license restrictions.');
    expect(r.body)
      .toHaveProperty('code', 1023);
  });

  it('should not be able create new reseller', async () => {
    const r = await new Client().create('reseller');
    expect(r.status)
      .toEqual(500);
    expect(r.body)
      .toHaveProperty('message', 'You cannot manage resellers due to license restrictions.');
    expect(r.body)
      .toHaveProperty('code', 1023);
  });

  it('should be able create new domain', async () => {
    const r = await new Domain().create();
    expect(r.status)
      .toEqual(201);
    expect(r.body)
      .toHaveProperty('id');
    expect(r.body)
      .toHaveProperty('guid');
    domainId = r.body.id;
  });

  it('should be able get domain details', async () => {
    const r = await new Domain().clientList(domainId);
    expect(r.status)
      .toEqual(200);
    expect(r.body)
      .toHaveProperty('name', 'admin');
    expect(r.body)
      .toHaveProperty('type', 'admin');
  });

  it('should be able get clients details for domain', async () => {
    const r = await new Domain().detail(domainId);
    expect(r.status)
      .toEqual(200);
    expect(r.body)
      .toHaveProperty('name', 'mydomain.com');
    expect(r.body)
      .toHaveProperty('hosting_type', 'virtual');
    expect(r.body)
      .toHaveProperty('id', domainId);
  });

  it('should be able get status of domain', async () => {
    const r = await new Domain().status(domainId);
    expect(r.status)
      .toEqual(200);
    expect(r.body)
      .toHaveProperty('status', 'active');
  });

  it('should be able suspend domain', async () => {
    const r = await new Domain().suspend(domainId);
    expect(r.status)
      .toEqual(200);
    expect(r.body)
      .toHaveProperty('status', 'suspended');
  });

  it('should be able delete existing domain', async () => {
    const r = await new Domain().delete(domainId);
    expect(r.status)
      .toEqual(200);
    expect(r.body)
      .toHaveProperty('id');
    expect(r.body)
      .toHaveProperty('guid');
  });
});
