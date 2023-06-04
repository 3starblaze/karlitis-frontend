import { Sequelize } from 'sequelize-typescript';
import { School } from './models/school.js';
import { StudentCount } from './models/student_count.js';
export const sequelize = new Sequelize({
    database: 'db',
    dialect: 'postgres',
    username: 'user',
    password: 'password',
	models: [School, StudentCount], // or [Player, Team],
}); 

StudentCount.removeAttribute('id');