import ILeader from './ILeader';

export default interface ILeaderMethods {
  listBoard(homeOrAway: string): Promise<ILeader[] | void>
}
