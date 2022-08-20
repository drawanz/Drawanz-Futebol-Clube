import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

export default class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    // field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    // field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    // field: 'away_team',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    // field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    // field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

Matches.hasMany(Teams, {
  foreignKey: 'homeTeam',
});

Matches.hasMany(Teams, {
  foreignKey: 'awayTeam',
});
