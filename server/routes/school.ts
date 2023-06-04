import { Application, Request, Response } from "express";
import { parseCommandLine } from "typescript";
import { School } from "../models/school.js";
import { StudentCount } from "../models/student_count.js";

async function listSchools(req: Request, res: Response) {
    let schools = await School.findAll({
        include: StudentCount,
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
            examScore: Math.random() * 100 // TODO: Calculate exam scores
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

export function registerSchoolRoutes(app: Application) {
    app.get('/api/schools/list', (req, res) => listSchools(req, res));
    app.get('/api/schools/:id', (req, res) => getSchool(req, res));
}