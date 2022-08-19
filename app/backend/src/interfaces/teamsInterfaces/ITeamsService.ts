import ITeam from './ITeam';

export default interface ITeamService {
  list(): Promise<ITeam[]>,
}
