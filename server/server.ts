import * as express from 'express';
const app = express();

app.get('/reklama', (req, res) => {
	res.redirect('http://reklama.narvesen.lv');
});

app.use('/', express.static('./build'));

console.log("cau");
console.log("Started at 3000");
app.listen(3000); 