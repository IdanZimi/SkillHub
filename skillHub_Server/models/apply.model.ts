import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/database';
import { User } from './user.model';
import { Project } from './project.model';

export enum Role {
  Developer = 'developer',
  Designer = 'designer',
  Marketing = 'marketing',
}

export enum Status {
  Waiting = 'waiting',
  InProgress = 'in progress',
  Done = 'done',
}

export class Apply extends Model {
  public id!: number;
  public userId!: number;
  public projectId!: number;
  public role!: Role;
  public status!: Status;

  // Other properties and methods can be added here

  // Define associations if any
}

Apply.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: 'id',
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(Role)),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Apply',
    tableName: 'applies',
    timestamps: true,
  }
);

//Apply.belongsTo(User, { foreignKey: 'userId' });
//Apply.belongsTo(Project, { foreignKey: 'projectId' });
