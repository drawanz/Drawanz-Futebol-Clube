import IMatches from '../matchesInterfaces/IMatches';
import ITeam from '../teamsInterfaces/ITeam';

export default interface ILeaderMethod {
  getTeams(): Promise<ITeam[]>,
  getMatches(): Promise<IMatches[]>
}
