import { Application, Request, Response } from "express";
import { collapseTextChangeRangesAcrossMultipleVersions, parseCommandLine } from "typescript";
import { CentralizetieEksameni } from "../models/centralizetie_eksameni.js";
import { School } from "../models/school.js";
import { StudentCount } from "../models/student_count.js";

// From 0.0 to 100.0
function weightedExamRating(eksameni?: CentralizetieEksameni[]): number | null {
    if (eksameni == undefined) return null;
    let augstaisLimenis = eksameni.find(eks => eks.optimal_level == false)
    let optimalaisLimenis = eksameni.find(eks => eks.optimal_level == true)

    function avgRating(eksamens: CentralizetieEksameni): number | null {
        let sum = 0;
        let weights = 0;
        // Start with optional languages which count as 1 total weight
        if (eksamens.anglu_val != undefined) {
            sum += eksamens.anglu_val;
            weights += 1;
        }
        if (eksamens.vacu_val != undefined) {
            sum += eksamens.vacu_val;
            weights += 1;
        }
        if (eksamens.francu_val != undefined) {
            sum += eksamens.francu_val;
            weights += 1;
        }
        if (eksamens.krievu_val != undefined) {
            sum += eksamens.krievu_val;
            weights += 1;
        }
        if (weights > 0) {
            sum /= weights;
            weights = 1;
        }

        // Other subjects
        if (eksamens.vesture != undefined) {
            sum += eksamens.vesture;
            weights += 1;
        }
        if (eksamens.biologija != undefined) {
            sum += eksamens.biologija;
            weights += 1;
        }
        if (eksamens.fizika != undefined) {
            sum += eksamens.fizika;
            weights += 1;
        }
        if (eksamens.kimija != undefined) {
            sum += eksamens.kimija;
            weights += 1;
        }
        if (eksamens.latv_val != undefined) {
            sum += 2 * eksamens.latv_val;
            weights += 2;
        }
        if (eksamens.matematika != undefined) {
            sum += 2 * eksamens.matematika;
            weights += 2;
        }

        if (weights == 0) {
            console.log("BRUH HOW");
            return null;
        }
        console.log(`Nice! ${sum / weights}`);
        return sum / weights;
    }

    // Augstais limenis and optimalais get a 2:1 weight ratio
    if (augstaisLimenis == undefined && optimalaisLimenis == undefined) {
        return null;
    } else if (augstaisLimenis == undefined) {
        return avgRating(optimalaisLimenis);
    } else if (optimalaisLimenis == undefined) {
        return avgRating(augstaisLimenis);
    } else {
        return (2 * avgRating(augstaisLimenis) + avgRating(optimalaisLimenis)) / 3;
    }
}

async function listSchools(req: Request, res: Response) {
    let schools = await School.findAll({
        include: [StudentCount, CentralizetieEksameni],
        attributes: ['reg_nr', 'nosaukums', 'gps_x', 'gps_y', 'skolotaji']
    });
    let schoolsList = schools.map(school => {
        let studentsPerTeacher: number = null;
        if (school.skolotaji != null && school.studentCounts != undefined && school.studentCounts.length > 0
            && school.studentCounts[0].totalStudents() > 0) {
            studentsPerTeacher = school.skolotaji / school.studentCounts[0].totalStudents();
        }
        return {
            id: school.reg_nr,
            name: school.nosaukums,
            gps: [school.gps_x, school.gps_y],
            skolotaji: school.skolotaji,
            studentsPerTeacher: studentsPerTeacher,
            examScore: weightedExamRating(school.eksameni),
        }
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(schoolsList));
}

async function getSchool(req: Request, res: Response) {
    let school: School | null = await School.findOne({ where: { reg_nr: req.params.id } });
    if (school === null) res.sendStatus(404);
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