import IData from '../interfaces/matchesInterfaces/IData';
import IMatches from '../interfaces/matchesInterfaces/IMatches';
import IMatchesMethods from '../interfaces/matchesInterfaces/IMatchesMethods';

export default class MatchesService implements IMatchesMethods {
  constructor(private matchesRepository: IMatchesMethods) { }

  public async list(): Promise<IMatches[]> {
    const response = await this.matchesRepository.list();
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
}
