const Sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { app } from '../app';
import Teams from '../database/models/teams';
import ITeam from '../interfaces/teamsInterfaces/ITeam'

const { expect } = chai;

const teamMock: ITeam = {
  "id": 1,
  "teamName": "teste1"
};

const teamsMockArray: ITeam[] = [{
  "id": 1,
  "teamName": "teste1"
},{
  "id": 2,
  "teamName": "teste2"
},{
  "id": 3,
  "teamName": "teste3"
}];


describe('Testing Tems', () => {
  describe('Testing /teams', () => {
    it('should return an array of teams', async () => {
      Sinon.stub(Teams, "findAll").resolves(teamsMockArray as ITeam[]);
      const response = await chai.request(app).get('/teams').send();
      
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('teamName');

      Sinon.restore();
    })
  })

  describe('Testing /teams/:id', () => {
    it('should return one team', async () => {
      Sinon.stub(Teams, "findByPk").resolves(teamMock as ITeam);
      const response = await chai.request(app).get('/teams/:id').send();
      console.log(response);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('teamName');

      Sinon.restore();
    })
  })
});
