import * as sinon from 'sinon';
const Sinon = require('sinon')
const chai = require('chai')
import IDataValues from '../interfaces/IDataValues';
const chaiHttp = require('chai-http')

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
  password: 'teste123456',
}

const bodyMock: IBodyReq = {
  email: 'teste@gmail.com',
  password: 'teste123456',
}

const tokenMock = {
  token: "my mocked token :)"
}

describe('Testing Users', () => {
  describe('Testing Login', () => {
    beforeEach(() => {
      Sinon.stub(User, "findOne").resolves(userMock as User);
    })
    
    afterEach(() => {
      Sinon.restore();
    })

    it('should return status code 200', async () => {
      const response = await chai.request(app).post('/login').send(bodyMock);
      console.log(response);
      expect(response.status).to.equal(200);
    })
  })

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
