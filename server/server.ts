import express from 'express';
import { sequelize } from './sequelize_setup.js';
import { StudentCount } from './models/student_count.js';
import cors from 'cors';
import { registerSchoolRoutes } from './routes/school.js';
const app = express();

app.use(cors());

registerSchoolRoutes(app);

app.get('/reklama', (req, res) => {
	res.redirect('http://reklama.narvesen.lv');
});
app.use('/', express.static('./build'));

console.log("cau");
console.log("Started at 6942");
app.listen(6942);
sequelize.sync({alter: false, force: false});
