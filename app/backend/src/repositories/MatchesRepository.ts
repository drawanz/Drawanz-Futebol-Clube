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
}
