require('dotenv').config()
const fs = require('fs');
const Pool = require('pg').Pool

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'hospitals',
  port: '5432',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

const hospitalQueryString = fs.readFileSync('hospital_query.sql').toString()

const getHospitals = (request, response) => {
  let lon = request.query.lon
  let lat = request.query.lat
  let search = request.query.search
  pool.query(hospitalQueryString, [lon, lat, search], (error, results) => {
    try {
      response.status(200).json(results.rows)
    }
    catch(error) {
      console.log(error.stack)
      response.sendStatus(500)
    }
  })
};

module.exports = { getHospitals };
