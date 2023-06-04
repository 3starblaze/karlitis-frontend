import { Application , Request, Response} from "express";
import { School } from "../models/school.js";

async function listSchools(req: Request, res: Response) {
    let schools = await School.findAll({
        attributes: ['reg_nr', 'nosaukums', 'gps_x', 'gps_y']
    });
    let schoolsList = schools.map(school => { return {
        id: school.reg_nr,
        name: school.nosaukums,
        gps: [school.gps_x, school.gps_y],
        examScore: Math.random() * 100 // TODO: Calculate exam scores
    }});

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(schoolsList));
}

async function getSchool(req: Request, res: Response) {
    let school: School | null = await School.findOne({where: {reg_nr: req.params.id}});
    if(school  === null) res.sendStatus(404);
    else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(school));
    }
}

async function nearbySchools(req: Request, res: Response) {
	if (req.body === undefined) return res.status(400);
	// console.log(req.body);

	// console.log(`https://nominatim.openstreetmap.org/search?q=${req.body.address}&format=json`);
	const geolocFetch = await fetch(`https://nominatim.openstreetmap.org/search?q=${req.body.address}&country=Latvia&format=json`);
	const geolocObj: any[] = await geolocFetch.json();
	const latLng = geolocObj.length === 0 ? null : [geolocObj[0].lat, geolocObj[0].lon];

	let schools = await School.findAll({
        attributes: ['reg_nr', 'nosaukums', 'gps_x', 'gps_y']
    });
    let schoolsList = schools.map(school => { return {
        id: school.reg_nr,
        name: school.nosaukums,
        gps: [school.gps_x, school.gps_y],
        examScore: Math.random() * 100 // TODO: Recalculate exam scores
    }});

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
		homeLatLng: latLng,
		updatedSchoolList: schoolsList
	}));
}

export function registerSchoolRoutes(app: Application) {
    app.get('/api/schools/list', (req, res) => listSchools(req, res));
    app.get('/api/schools/:id', (req, res) => getSchool(req, res));
	app.post('/api/schools/nearby', (req, res) => nearbySchools(req, res))
}