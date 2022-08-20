import ITeam from '../interfaces/teamsInterfaces/ITeam';
import Teams from '../database/models/Teams';

export default class TeamsRepository {
  private _teamsRepository;

  constructor(private teamsRepository = Teams) {
    this._teamsRepository = teamsRepository;
  }

  public async list(): Promise<ITeam[]> {
    const response = await this._teamsRepository.findAll();
    return response as ITeam[];
  }

  public async listById(id: string): Promise<ITeam> {
    const response = await this._teamsRepository.findByPk(id);
    return response as ITeam;
  }
}
