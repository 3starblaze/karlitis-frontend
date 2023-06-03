"use strict";
// Code generated with ChatGPT 4
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx = require("xlsx");
var tmp = require("tmp");
var https = require("https");
var fs = require("fs");
var studentCountUrl = "https://data.gov.lv/dati/dataset/9c8954d6-d8b7-4ebd-97cb-219b3bbc75d9/resource/fe40a325-e4d1-465e-a6e1-a63d675cc71b/download/izglitojamoskvispizglprogr_pa_iestadem_01122022.xlsx";
function downloadFile(filePath, url) {
    return new Promise(function (resolve, reject) {
        var file = fs.createWriteStream(filePath);
        https.get(url, function (res) {
            res.pipe(file);
            file.on('finish', function () {
                file.close();
                resolve();
            });
            file.on('error', function (err) {
                reject(err);
            });
        });
    });
}
;
tmp.file(function (err, filePath, fd, cleanupCallback) {
    if (err)
        throw (err);
    downloadFile(filePath, studentCountUrl).then(function () {
        var workbook = xlsx.readFile(filePath);
        var sheetNames = workbook.SheetNames;
        // Get the data of "Sheet1"
        var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
        console.log(data[0]);
    }).catch(function (err) { throw (err); });
});
