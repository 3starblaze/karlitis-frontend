import { Sequelize } from 'sequelize-typescript';
import { School } from './models/school.js';
import { StudentCount } from './models/student_count.js';
import { CentralizetieEksameni } from './models/centralizetie_eksameni.js';
export const sequelize = new Sequelize({
    database: 'db',
    dialect: 'postgres',
    username: 'user',
    password: 'password',
	models: [School, StudentCount, CentralizetieEksameni], // or [Player, Team],
    logging: false,
}); 

StudentCount.removeAttribute('id');
CentralizetieEksameni.removeAttribute('id'); 
