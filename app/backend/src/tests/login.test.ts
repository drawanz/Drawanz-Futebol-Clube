import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
import IDataValues from '../interfaces/IDataValues';
import chaiHttp from 'chai-http';

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import IBodyReq from '../interfaces/IBodyReq';
import UsersService from '../services/UsersService';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IDataValues = {
  dataValues: {
    username: 'teste',
    role: 'teste',
    email: 'teste@gmail.com',
    password: 'teste123456',
  }
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
    Sinon.stub(_userRepository, )
  })

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
