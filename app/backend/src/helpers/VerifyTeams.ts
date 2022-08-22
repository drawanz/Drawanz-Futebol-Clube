import Teams from '../database/models/Teams';
import ErrorException from './ErrorException';

const verifyToken = async (homeTeam: number, awayTeam :number) => {
  if (homeTeam === awayTeam) {
    throw new ErrorException(401, 'It is not possible to create a match with two equal teams');
  }

  const teams = await Teams.findAll();

  if (
    !teams.some((e) => e.id === homeTeam)
    || !teams.some((e) => e.id === awayTeam)) {
    throw new ErrorException(404, 'There is no team with such id!');
  }
};

export default verifyToken;
