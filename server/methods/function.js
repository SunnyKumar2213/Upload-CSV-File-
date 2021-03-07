const fs = require('fs')
const csv = require('csv-parser')
async function processCSVFile(fileName){
    return new Promise((resolve, reject) => {
    let results=[];
    let headers=[];
    fs.createReadStream(fileName)
    .pipe(csv())
    .on('headers', (header) => headers.push(header))
    .on('data', (data) => results.push(data))
    .on('end', async() => {
        let obj={
          header:"",
          data:""
        };
        if(results){
          obj.header=headers;
          obj.data=results;
          resolve(obj);
  
        }else {
          reject(0);
        }
  
    });
  });
  }
  module.exports.processCSVFile = processCSVFile;