'use strict';

const { server } = require('../src/server');
const { sequelize } = require('../src/auth/models');
const base64 = require('base-64');
const supertest = require('supertest');
const request = supertest(server);


beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
    await sequelize.drop();
  });
  describe('Testing Basic Auth Server',()=>{
    
    test('Should allow users to signup, with a POST to /signup',async ()=>{
      let response = await request.post('/signup').send({
        username: 'marcus',
        password: 'pass123'
      });
      console.log('Response Body', response.body);
      expect(response.status).toEqual(200);
      expect(response.body.username).toEqual('marcus');
      expect(response.body.password).toBeTruthy();
      expect(response.body.password).not.toEqual('marcus');
    })
    test('should permit a user to `signin` with correct password', async ()=>{
      let authString = 'marcus:pass123'
  
      let encodedString = base64.encode(authString);
      console.log(`THIS IS THE ENCODED STRING ${encodedString}`);
      let response = await request.post('/signin').set('Authorization', `Basic ${encodedString}`);
      console.log(`THIS IS THE RESPONSE.BODY: `, response.body);
      expect(response.status).toEqual(200);
      expect(response.body.username).toEqual('marcus');
    });
});
