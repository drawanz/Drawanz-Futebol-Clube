import IMatches from './IMatches';

export default interface IMatchesMethods {
  list(): Promise<IMatches[]>,
  // listById(id: string): Promise<IMatches>
}
