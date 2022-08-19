// import * as sinon from 'sinon';
const Sinon = require('sinon');
const chai = require('chai');
import IDataValues from '../interfaces/IDataValues';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { app } from '../app';
import { Response } from 'superagent';
import IBodyReq from '../interfaces/IBodyReq';
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

const tokenMock = {
  token: "my mocked token :)"
}

describe('Testing Users', () => {
  describe('Testing Login', () => {
    it(`should return status code 200, a body with a propery named token and 
    the token should be a string`, async () => {
      Sinon.stub(User, "findOne").resolves(userMock as User);
      const response = await chai.request(app).post('/login').send(bodyMock);
      expect(response.status).to.equal(200);
      // console.log(response);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
      Sinon.restore();
    })
  })


});
