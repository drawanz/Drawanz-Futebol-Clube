import ILeader from './ILeader';

export default interface ILeaderMethods {
  listBoard(): Promise<ILeader[] | void>
}
