import { Sequelize } from "sequelize";
import config from '../../config/config.json';

export const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: config.development.port,
    }
);
