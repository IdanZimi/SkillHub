import { Model, DataTypes } from "sequelize";
import { sequelize } from "../src/database";
import {Project} from './project.model';
import {Apply} from './apply.model'
import {ProjectUser} from './projcet-user.model'

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public skills! : string[]
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    modelName: 'User', 
    tableName: "users",
    sequelize,
  }
);

User.hasMany(Project, { foreignKey: 'userId' });
User.hasMany(Apply, { foreignKey: 'userId' });
User.hasMany(ProjectUser, { foreignKey: 'userId' });
