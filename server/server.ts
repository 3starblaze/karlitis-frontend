import express from 'express';
import { sequelize } from './sequelize_setup.js';
import { StudentCount } from './models/student_count.js';
const app = express();

app.get('/reklama', (req, res) => {
	res.redirect('http://reklama.narvesen.lv');
});
app.use('/', express.static('./build'));

console.log("cau");
console.log("Started at 3000");
app.listen(3000); 
sequelize.sync({alter: false, force: false});
StudentCount.findAll({where: { count_1_klase: 4 }});