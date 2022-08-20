import ITeam from './ITeam';

export default interface TeamsMethods {
  list(): Promise<ITeam[]>,
  listById(id: string): Promise<ITeam>
}
