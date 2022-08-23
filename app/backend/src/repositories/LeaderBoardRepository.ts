import Matches from '../database/models/Matches';

export default class LeaderBoardRepository {
  private _leaderBoardRepository;

  constructor(private leaderBoardRepository = Matches) {
    this._leaderBoardRepository = leaderBoardRepository;
  }

  public async findAllMatches(query: object) {
    const response = await this._leaderBoardRepository.findAll(query);
    return response;
  }
}
