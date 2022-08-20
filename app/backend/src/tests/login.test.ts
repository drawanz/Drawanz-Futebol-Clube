const Sinon = require('sinon');
const chai = require('chai');
import IDataValues from '../interfaces/userInterfaces/IDataValues';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { app } from '../app';
import IBodyReq from '../interfaces/userInterfaces/IBodyReq';
import User from '../database/models/user';

const { expect } = chai;

const userMock: IDataValues = {
  username: 'teste',
  role: 'teste',
  email: 'teste@gmail.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const bodyMock: IBodyReq = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const tokenMock: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjYwOTM0NjA5fQ.NZBlivcyj9Yai4esiGeuJ_9eIw5n0KMRB6LyMZ5j76E";


describe('Testing Users', () => {
  describe('Testing Login', () => {
    it('should return token', async () => {
      Sinon.stub(User, "findOne").resolves(userMock as IDataValues);
      const response = await chai.request(app).post('/login').send(bodyMock);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
      Sinon.restore();
    })
  })

  describe('Testing Login Validate', () => {
    it('should return role', async () => {
      Sinon.stub(User, "findOne").resolves(userMock as IDataValues);
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', tokenMock)
        .send();
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('role');
      expect(response.body.role).to.be.a('string');
      Sinon.restore();
    })
  })
});
