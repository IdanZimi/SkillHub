import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/database';
import {User} from './user.model';
import {Project} from './project.model';
import {Role} from './apply.model'


export class ProjectUser extends Model {
  public id!: number;
  public userId!: number;
  public projectId!: number;
  public role!: Role;
}

ProjectUser.init(
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
  },
  {
    sequelize,
    modelName: 'ProjectUser',
    tableName: 'project_users',
    timestamps: true,
  }
);

ProjectUser.belongsTo(User, { foreignKey: 'userId' });
ProjectUser.belongsTo(Project, { foreignKey: 'projectId' });
