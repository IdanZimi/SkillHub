import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/database/index'; 
import {User} from './user.model'; 
import { Apply } from './apply.model';
import {ProjectUser} from './projcet-user.model'

export class Project extends Model {
    public id!: number;
    public userId!: number;
    public title!: string;
    public description!: string;
    public image!: string | null;
  
    // Other properties and methods can be added here
  
    // Define associations if any
  }
  
  Project.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Project',
      tableName: 'projects',
      timestamps: true,
    }
  );
  
  Project.belongsTo(User, { foreignKey: 'userId' });
  Project.hasMany(Apply, { foreignKey: 'projectId' });
  Project.hasMany(Apply, { foreignKey: 'userId' });
  Project.hasMany(ProjectUser, { foreignKey: 'projectId' });



  