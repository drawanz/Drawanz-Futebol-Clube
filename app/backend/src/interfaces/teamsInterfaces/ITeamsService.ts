import ITeam from './ITeam';

export default interface ITeamService {
  list(): Promise<ITeam[]>,
  listById(id: string): Promise<ITeam>
}
