const app = require('express').Router();
const fileUpload = require('express-fileupload');

const successfullRetrun = require('../helpers/SuccessObject');
const setErrorResponse = require('../helpers/ErrorObject');
const functions = require('../methods/function');

app.post('/upload',function(req, res) {
  let sampleFile;
  if (!req.files || Object.keys(req.files).length === 0) {
    return  res.status(400).send(setErrorResponse.returnErrorMessage("No files were uploaded."));
  }
  sampleFile = req.files.sampleFile;
  sampleFile.mv(sampleFile.name, async function(err) {
    if (err){
      return res.status(500).send(err);
  }
      let result= await functions.processCSVFile(sampleFile.name);
      if(result){
        return res.status(200).send(successfullRetrun.getSuccessfull(result));
      }else {
        res.status(400).send(setErrorResponse.returnErrorMessage(err));
      }
  });
});


module.exports = app;