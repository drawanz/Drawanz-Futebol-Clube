import ILeaderMethods from '../interfaces/leaderInterfaces/ILeaderMethods';
import ILeader from '../interfaces/leaderInterfaces/ILeader';
import ILeaderMethod from '../interfaces/leaderInterfaces/ILeaderRepoMethods';
import IMatches from '../interfaces/matchesInterfaces/IMatches';
import ITeam from '../interfaces/teamsInterfaces/ITeam';

export default class LeaderBoardService implements ILeaderMethods {
  constructor(private leaderBoardRepository: ILeaderMethod) { }

  public async listBoard(homeOrAway: string): Promise<ILeader[]> {
    const matches = await this.leaderBoardRepository.getMatches();
    const teams = await this.leaderBoardRepository.getTeams();
    const response = LeaderBoardService.getLeaderBoard(homeOrAway, teams, matches);
    const sorted = response.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
    return sorted;
  }

  static getLeaderBoard(homeOrAway: string, teams: ITeam[], matches: IMatches[]): ILeader[] {
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

  static getTeamStats(homeOrAway: string, id: number, matches: IMatches[]) {
    const teamHomeStats = LeaderBoardService.getTeamHomeStats(id, matches);
    const teamAwayStats = LeaderBoardService.getTeamAwayStats(id, matches);
    if (homeOrAway === 'home') return teamHomeStats;
    if (homeOrAway === 'away') return teamAwayStats;
    return {
      totalPoints: teamHomeStats.totalPoints + teamAwayStats.totalPoints,
      totalGames: teamHomeStats.totalGames + teamAwayStats.totalGames,
      totalVictories: teamHomeStats.totalVictories + teamAwayStats.totalVictories,
      totalDraws: teamHomeStats.totalDraws + teamAwayStats.totalDraws,
      totalLosses: teamHomeStats.totalLosses + teamAwayStats.totalLosses,
      goalsFavor: teamHomeStats.goalsFavor + teamAwayStats.goalsFavor,
      goalsOwn: teamHomeStats.goalsOwn + teamAwayStats.goalsOwn,
      goalsBalance: teamHomeStats.goalsBalance + teamAwayStats.goalsBalance,
    };
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
}
