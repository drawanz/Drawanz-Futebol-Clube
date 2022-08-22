import IMatches from './IMatches';

export default interface IMatchesMethods {
  list(): Promise<IMatches[]>,
  listByFilter(query: string): Promise<IMatches[]>
}
