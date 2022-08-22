import Teams from '../database/models/Teams';
import IData from '../interfaces/matchesInterfaces/IData';
import IMatches from '../interfaces/matchesInterfaces/IMatches';
import IMatchesMethods from '../interfaces/matchesInterfaces/IMatchesMethods';

export default class MatchesService implements IMatchesMethods {
  constructor(private matchesRepository: IMatchesMethods) { }

  public async list(): Promise<IMatches[]> {
    const query = {
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    };

    const response = await this.matchesRepository.list(query);
    return response as IMatches[];
  }

  public async listByFilter(query: string): Promise<IMatches[]> {
    const response = await this.matchesRepository.listByFilter(query);
    return response as IMatches[];
  }

  public async addMatch(
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IData,
  ): Promise<IMatches> {
    const query = {
      where: { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals },
      defaults: {
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      },
    };

    const response = await this.matchesRepository.addMatch(query);
    return response as IMatches;
  }

  public async changeProgress(id: number): Promise<object> {
    const response = await this.matchesRepository.changeProgress(id);
    return response;
  }
}
