import IMatches from './IMatches';

export default interface TeamsMethods {
  list(): Promise<IMatches[]>,
  // listById(id: string): Promise<IMatches>
}
