import ITeamService from '../interfaces/teamsInterfaces/ITeamsService';
import Teams from '../database/models/teams';
import ITeam from '../interfaces/teamsInterfaces/ITeam';

export default class TeamService implements ITeamService {
  constructor(private teams = Teams) { }

  public async list(): Promise<ITeam[]> {
    const response = await this.teams.findAll();
    return response as ITeam[];
  }
}
