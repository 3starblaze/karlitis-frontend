import * as xlsx from 'xlsx';
import * as tmp from 'tmp';
import * as https from 'https';
import * as fs from 'fs';
import { sequelize } from '../sequelize_setup.js';
import { School, SchoolInput } from '../models/school.js';
import { buffer } from 'stream/consumers';

const studentCountUrl = "https://data.gov.lv/dati/dataset/9c8954d6-d8b7-4ebd-97cb-219b3bbc75d9/resource/fe40a325-e4d1-465e-a6e1-a63d675cc71b/download/izglitojamoskvispizglprogr_pa_iestadem_01122022.xlsx";
const skoluKarteUrl = "https://izm.kartes.lv/api?action=layer&layer=skolas_2018.geojson";

sequelize.sync({ alter: true, force: true });

console.log('Fetching student-count!');
fetch(studentCountUrl)
  .then(response => response.arrayBuffer())
  .then(async buffer => {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;

    // Get the data of "Sheet1"
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

    const schools = new Map<number, SchoolInput>;

    // First we populate schools with data from excell spreadsheet, and then overwrite them with data from skolu karte
    data.forEach(row => {
      let reg_nr = row['Iestādes reģistrācijas Nr.']
      // Skip primary schools
      if (row['Iestādes veids'] == 'Pirmsskolas izglītības iestāde') return;
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
            skolotaju_videja_alga: prop['alga'],
            skolotaji: prop['Skolotāju skaits'],
            gps_x: feature['geometry']['coordinates'][0],
            gps_y: feature['geometry']['coordinates'][1],
          });
        });
      });

    console.log('Inserting schools into database...');
    await School.bulkCreate(Array.from(schools.values()));

  }).then(async () => {
    //console.log("Querying Database...");
    //School.findAll().then(queryResult => console.log(queryResult));
  });