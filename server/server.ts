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

app.use(function(req,res){
    res.status(404).send('Kārlīti lūdzam neapcelt :) <br/> 404 <br/> <img src="http://reklama.narvesen.lv/berta2/liels/liels.gif"/>');
});

console.log("cau");
console.log("Started at 3000");
app.listen(3000); 
sequelize.sync({alter: false, force: false});