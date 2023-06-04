import express from 'express';
import { sequelize } from './sequelize_setup.js';
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
console.log("Started at 3000");
app.listen(3000); 
sequelize.sync();