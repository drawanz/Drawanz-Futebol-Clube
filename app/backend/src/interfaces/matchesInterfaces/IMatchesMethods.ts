import IMatches from './IMatches';

export default interface IMatchesMethods {
  list(query: object): Promise<IMatches[]>,
  listByFilter(query: string): Promise<IMatches[]>,
  addMatch(data: object): Promise<IMatches>,
  changeProgress(id: number): Promise<object>,
  changeGoals(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: number,
  ): Promise<object>,
}
