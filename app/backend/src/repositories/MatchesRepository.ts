import IMatches from '../interfaces/matchesInterfaces/IMatches';
import Matches from '../database/models/Matches';
import IMatchesMethods from '../interfaces/matchesInterfaces/IMatchesMethods';
import Teams from '../database/models/Teams';

export default class MatchesRepository implements IMatchesMethods {
  private _matchessRepository;

  constructor(private matchessRepository = Matches) {
    this._matchessRepository = matchessRepository;
  }

  public async list(): Promise<IMatches[]> {
    const response = await this._matchessRepository.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return response as IMatches[];
  }

  public async listByFilter(query: string): Promise<IMatches[]> {
    const queryBool = query === 'true';
    const response = await this._matchessRepository.findAll({
      where: { inProgress: queryBool },
    });
    return response as IMatches[];
  }

  public async addMatch(query: object): Promise<IMatches> {
    const [response] = await this._matchessRepository.findOrCreate(query);
    return {
      id: response.getDataValue('id'),
      homeTeam: response.getDataValue('homeTeam'),
      homeTeamGoals: response.getDataValue('homeTeamGoals'),
      awayTeam: response.getDataValue('awayTeam'),
      awayTeamGoals: response.getDataValue('awayTeamGoals'),
      inProgress: response.getDataValue('inProgress'),
    };
  }
}
