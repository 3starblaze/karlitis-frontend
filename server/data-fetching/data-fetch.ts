import * as xlsx from 'xlsx';
import * as tmp from 'tmp';
import * as https from 'https';
import * as fs from 'fs';
import { sequelize } from '../sequelize_setup.js';
import { School, SchoolInput } from '../models/school.js';
import { StudentCount, StudentCountInput } from '../models/student_count.js';
import { CentralizetieEksameni, CentralizetieEksameniInput } from '../models/centralizetie_eksameni.js';
import { buffer } from 'stream/consumers';

function numberOrUndefined(text: string): number | null {
  let n = parseInt(text)
  if (isNaN(n)) return null;
  return n;
}

const studentCountUrl = "https://data.gov.lv/dati/dataset/9c8954d6-d8b7-4ebd-97cb-219b3bbc75d9/resource/fe40a325-e4d1-465e-a6e1-a63d675cc71b/download/izglitojamoskvispizglprogr_pa_iestadem_01122022.xlsx";
const skoluKarteUrl = "https://izm.kartes.lv/api?action=layer&layer=skolas_2018.geojson";
const eksamenuUrl = "https://www.visc.gov.lv/lv/media/18533/download?attachment";

// DROP existing tables
sequelize.sync({ alter: true, force: true });

console.log('Fetching school data!');
fetch(studentCountUrl)
  .then(response => response.arrayBuffer())
  .then(async buffer => {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;

    // Get the data of "Sheet1"
    let spreadsheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])
    // Skip primary schools
    let schoolData = spreadsheetData.filter(row => row['Iestādes veids'] != 'Pirmsskolas izglītības iestāde');

    const schools = new Map<number, SchoolInput>;

    // First we populate schools with data from excell spreadsheet, and then overwrite them with data from skolu karte
    schoolData.forEach(row => {
      let reg_nr = row['Iestādes reģistrācijas Nr.']
      schools.set(reg_nr, {
        reg_nr: reg_nr,
        nosaukums: row['Iestādes nosaukums'],
      });
    });

    console.log("Fetching school locations...");
    await fetch(skoluKarteUrl)
      .then(response => response.json())
      .then(async json => {
        json['features'].map(feature => {
          let prop = feature['properties'];
          let reg_nr: number = prop['Register'];
          // Excell spreadsheet has newer data, so its school names should be preferred
          let nosaukums: string = (schools.has(reg_nr)) ? schools.get(reg_nr)!.nosaukums : prop['Nosaukums'];
          schools.set(reg_nr, {
            reg_nr: reg_nr,
            nosaukums: nosaukums,
            adrese: prop['Adrese'],
            skolotaju_videja_alga: numberOrUndefined(prop['alga']),
            skolotaji: numberOrUndefined(prop['Skolotāju skaits']),
            gps_x: feature['geometry']['coordinates'][0],
            gps_y: feature['geometry']['coordinates'][1],
          });
        });
      });

    console.log('Inserting schools into database...');
    await School.bulkCreate(Array.from(schools.values()));



    // Populating student_count table
    let date = new Date(2022, 12, 1);

    console.log('Inserting student count into database...');
    schoolData.forEach(async row => {
      await StudentCount.create({
        date: date,
        school: row['Iestādes reģistrācijas Nr.'],
        count_1_klase: row['1. klase'],
        count_2_klase: row['2. klase'],
        count_3_klase: row['3. klase'],
        count_4_klase: row['4. klase'],
        count_5_klase: row['5. klase'],
        count_6_klase: row['6. klase'],
        count_7_klase: row['7. klase'],
        count_8_klase: row['8. klase'],
        count_9_klase: row['9. klase'],
        count_10_klase: row['10. klase'],
        count_11_klase: row['11. klase'],
        count_12_klase: row['12. klase'],
      });
    });

    // Populating centralizetie_eksameni table

    // Attempts to find school ID from its name
    function findSchool(name: string): number | undefined {
      let result = undefined;
      schools.forEach((details: SchoolInput, regNr: number) => {
        if (details.nosaukums == name) {
          result = regNr;
          return; // exit foreach
        };
        if (details.nosaukums.startsWith(name) || name.startsWith(details.nosaukums)) {
          console.warn(`Merging exam data for ${name} to school ${details.nosaukums}`);
          result = regNr;
          return; // exit foreach
        }
      });
      return result;
    }

    let year = 2022;
    fetch(eksamenuUrl)
      .then(response => response.arrayBuffer())
      .then(async buffer => {
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;

        // Get the data of "Sheet1"
        let spreadsheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
        // Group exam results per school
        let examDataPerSchool: { [schoolId: number]: { [key: string]: number } } = {};
        spreadsheetData.forEach(row => {
          let schoolName = row['Izglītības iestāde'];
          let schoolId = findSchool(schoolName);
          if (schoolId == undefined) {
            console.warn(`Unable to find school for ${schoolName}`);
          } else {
            let tips: string = row['Centralizētais eksāmens'];
            if (examDataPerSchool[schoolId] == undefined) examDataPerSchool[schoolId] = {};
            examDataPerSchool[schoolId][tips] = row['vidējais vērtējums'];
          }
        });


        (Object.keys(examDataPerSchool) as unknown as Array<number>).forEach(async (schoolId: number) => {
          await CentralizetieEksameni.bulkCreate([{
            school: schoolId,
            year: year,
            optimal_level: false,
            anglu_val: examDataPerSchool[schoolId]['Centralizētais eksāmens angļu valodā 12.klasē'],
            francu_val: examDataPerSchool[schoolId]['Centralizētais eksāmens franču valodā 12.klasē'],
            krievu_val: examDataPerSchool[schoolId]['Centralizētais eksāmens krievu valodā 12.klasei'],
            vacu_val: examDataPerSchool[schoolId]['Centralizētais eksāmens vācu valodā 12.klasē'],
            latv_val: examDataPerSchool[schoolId]['Centralizētais eksāmens latviešu valodā 12.klasei'],
            biologija: examDataPerSchool[schoolId]['Centralizētais eksāmens bioloģijā 12.klasei'],
            fizika: examDataPerSchool[schoolId]['Centralizētais eksāmens fizikā 12.klasē'],
            kimija: examDataPerSchool[schoolId]['Centralizētais eksāmens ķīmijā 12.klasē'],
            vesture: examDataPerSchool[schoolId]['Centralizētais eksāmens Latvijas un pasaules vēsturē 12.klasei'],
            matematika: examDataPerSchool[schoolId]['Centralizētais eksāmens matemātikā 12.klasei'],
          }, {
            school: schoolId,
            year: year,
          optimal_level: true,
            anglu_val: examDataPerSchool[schoolId]['Centralizētais eksāmens angļu valodā 12.klasē'],
            francu_val: examDataPerSchool[schoolId]['Centralizētais eksāmens franču valodā optimālajā līmenī'],
            vacu_val: examDataPerSchool[schoolId]['Centralizētais eksāmens vācu valodā optimālajā līmenī'],
            latv_val: examDataPerSchool[schoolId]['Centralizētais eksāmens latviešu valodā optimālajā līmenī'],
            matematika: examDataPerSchool[schoolId]['Centralizētais eksāmens matemātikā optimālajā līmenī'],
          }]);
        });


      }).then(async () => {
        console.log("Data insertion complete!");
        //console.log("Querying Database...");
        //School.findAll().then(queryResult => console.log(queryResult));
      });
  });