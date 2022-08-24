import ILeaderMethods from '../interfaces/leaderInterfaces/ILeaderMethods';
import ILeader from '../interfaces/leaderInterfaces/ILeader';
import ILeaderMethod from '../interfaces/leaderInterfaces/ILeaderRepoMethods';
import IMatches from '../interfaces/matchesInterfaces/IMatches';

export default class LeaderBoardService implements ILeaderMethods {
  constructor(private leaderBoardRepository: ILeaderMethod) { }

  public async listBoard(homeOrAway: string): Promise<ILeader[]> {
    const matches = await this.leaderBoardRepository.getMatches();
    const teams = await this.leaderBoardRepository.getTeams();
    const response = teams.map((e) => {
      const teamStats = LeaderBoardService.getTeamStats(homeOrAway, e.id, matches);
      return {
        name: e.teamName,
        totalPoints: teamStats.totalPoints,
        totalGames: teamStats.totalGames,
        totalVictories: teamStats.totalVictories,
        totalDraws: teamStats.totalDraws,
        totalLosses: teamStats.totalLosses,
        goalsFavor: teamStats.goalsFavor,
        goalsOwn: teamStats.goalsOwn,
        goalsBalance: teamStats.goalsBalance,
        efficiency: `${((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100).toFixed(2)}`,
      };
    });
    return response;
  }

  static getTeamHomeStats(id: number, matches: IMatches[]) {
    const games = matches.filter((e) => e.homeTeam === id);
    const totalGames = games.length;
    const totalVictories = games.filter((e) => e.homeTeamGoals > e.awayTeamGoals).length;
    const totalLosses = games.filter((e) => e.homeTeamGoals < e.awayTeamGoals).length;
    const totalDraws = totalGames - (totalVictories + totalLosses);
    const goalsFavor = games.map((e) => e.homeTeamGoals).reduce((acc, value) => acc + value);
    const goalsOwn = games.map((e) => e.awayTeamGoals).reduce((acc, value) => acc + value);
    const goalsBalance = goalsFavor - goalsOwn;
    const totalPoints = (totalVictories * 3) + (totalDraws);
    return { totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance };
  }

  static getTeamAwayStats(id: number, matches: IMatches[]) {
    const games = matches.filter((e) => e.awayTeam === id);
    const totalGames = games.length;
    const totalVictories = games.filter((e) => e.homeTeamGoals < e.awayTeamGoals).length;
    const totalLosses = games.filter((e) => e.homeTeamGoals > e.awayTeamGoals).length;
    const totalDraws = totalGames - (totalVictories + totalLosses);
    const goalsFavor = games.map((e) => e.awayTeamGoals).reduce((acc, value) => acc + value);
    const goalsOwn = games.map((e) => e.homeTeamGoals).reduce((acc, value) => acc + value);
    const goalsBalance = goalsFavor - goalsOwn;
    const totalPoints = (totalVictories * 3) + (totalDraws);
    return { totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance };
  }

  static getTeamStats(homeOrAway: string, id: number, matches: IMatches[]) {
    if (homeOrAway === 'home') {
      const teamStats = LeaderBoardService.getTeamHomeStats(id, matches);
      return teamStats;
    }
    const teamStats = LeaderBoardService.getTeamAwayStats(id, matches);
    return teamStats;
  }
}
