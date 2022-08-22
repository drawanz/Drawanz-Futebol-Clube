import IMatches from '../interfaces/matchesInterfaces/IMatches';
import IMatchesMethods from '../interfaces/matchesInterfaces/IMatchesMethods';

export default class MatchesService implements IMatchesMethods {
  constructor(private matchesRepository: IMatchesMethods) { }

  public async list(): Promise<IMatches[]> {
    const response = await this.matchesRepository.list();
    return response as IMatches[];
  }
}
