import ITeam from '../interfaces/teamsInterfaces/ITeam';
import ITeamMethods from '../interfaces/teamsInterfaces/ITeamMethods';

export default class TeamService implements ITeamMethods {
  constructor(private teamsRepository: ITeamMethods) { }

  public async list(): Promise<ITeam[]> {
    const response = await this.teamsRepository.list();
    return response as ITeam[];
  }

  public async listById(id: string): Promise<ITeam> {
    const response = await this.teamsRepository.listById(id);
    return response as ITeam;
  }
}
