import ITeam from '../interfaces/teamsInterfaces/ITeam';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import IMatches from '../interfaces/matchesInterfaces/IMatches';

export default class LeaderBoardService {
  constructor(private teamsRepository = Teams, private matchesRepository = Matches) { }

  public async getTeams(): Promise<ITeam[]> {
    const response = await this.teamsRepository.findAll();
    return response.map((el) => el.get({ plain: true })); // remove metadados
  }

  public async getMatches(): Promise<IMatches[]> {
    const response = await this.matchesRepository.findAll({
      where: { inProgress: false },
    });
    return response.map((el) => el.get({ plain: true })); // remove metadados
  }
}
