import ITeamService from '../interfaces/teamsInterfaces/ITeamsService';
import ITeam from '../interfaces/teamsInterfaces/ITeam';
import TeamsMethods from '../interfaces/teamsInterfaces/ITeamMethods';

export default class TeamService implements ITeamService {
  constructor(private teamsRepository: TeamsMethods) { }

  public async list(): Promise<ITeam[]> {
    const response = await this.teamsRepository.list();
    return response as ITeam[];
  }

  public async listById(id: string): Promise<ITeam> {
    const response = await this.teamsRepository.listById(id);
    return response as ITeam;
  }
}
