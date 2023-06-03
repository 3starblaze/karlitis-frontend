import { Sequelize } from 'sequelize-typescript';
import { School } from './models/school.js';
export const sequelize = new Sequelize({
    database: 'db',
    dialect: 'postgres',
    username: 'user',
    password: 'password',
	models: [School], // or [Player, Team],
  }); 
