import IMatches from '../interfaces/matchesInterfaces/IMatches';
import HelpersBoard from '../helpers/HelpersBoard';
// import LeaderBoardRepository from '../repositories/LeaderBoardRepository';

export default class LeaderBoardService {
  constructor(private leaderBoardRepository: HelpersBoard) { }

  public async listBoard() {
    const matches = await this.leaderBoardRepository.getMatches();
    const teams = await this.leaderBoardRepository.getTeams();
    const response = teams.map((e) => {
      const teamStats = LeaderBoardService.getTeamStats(e.id, matches);
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

  static getTeamStats(id: number, matches: IMatches[]) {
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
}
