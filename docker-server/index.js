const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://lab.dfsnow.me:8020");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/hospitals', routes.getHospitals);
app.get('/', (request, response) => {
  response.json({ info: 'Price Mapper API Entrypoint at /hospitals'})
});

app.listen(port, () => {
  console.log("Listening on port " + port)
});


