// Code generated with ChatGPT 4

import * as xlsx from 'xlsx';
import * as tmp from 'tmp';
import * as https from 'https';
import * as fs from 'fs';

const studentCountUrl = "https://data.gov.lv/dati/dataset/9c8954d6-d8b7-4ebd-97cb-219b3bbc75d9/resource/fe40a325-e4d1-465e-a6e1-a63d675cc71b/download/izglitojamoskvispizglprogr_pa_iestadem_01122022.xlsx";


function downloadFile(filePath: string, url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        reject(err);
      });
    });
  });
};

tmp.file((err, filePath, fd, cleanupCallback) => {
  if (err) throw (err);
  downloadFile(filePath, studentCountUrl).then(() => {
    const workbook = xlsx.readFile(filePath);
    const sheetNames = workbook.SheetNames;

    // Get the data of "Sheet1"
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

    // Do what you need with the received data
    data.map(row => {
      console.log(data[0]);
    });

  }).catch((err) => { throw (err) });
});