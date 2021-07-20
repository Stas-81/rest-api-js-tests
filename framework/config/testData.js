export const domainData = `{
"name": "mydomain.com",
"hosting_type": "virtual",
"hosting_settings": {
"ftp_login": "ftplogin",
"ftp_password": "Pa$$w0rd"
},
"ipv4": ["165.22.75.193"],
"plan": {
"name": "Unlimited"
}
}`;

export function clientData(clientType) {
  return `{
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
}
