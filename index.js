// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {

  const dateParams = req.params.date;

  const dateIsValid = date => date instanceof Date && !isNaN(date);
  
  let date, milisecond, result;

  if (dateParams === undefined) {
    date = new Date();
  } else {
    date = new Date(dateParams);
  }
  
  if (dateIsValid(date)) {
    milisecond = date.getTime();
    result = { unix: milisecond, utc: date.toUTCString() };
  }
  else if (/^\d+$/.test(dateParams)) {
    milisecond = parseInt(dateParams); 
    date = new Date();
    date.setTime(milisecond);

    result = { unix: milisecond, utc: date.toUTCString() };
  } 
  else {
    result = { error : "Invalid Date" };
  }

  res.json(result);
});

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
