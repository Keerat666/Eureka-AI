var mysql = require("mysql")

var connection = mysql.createConnection({
    host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '2MbqBYv2vARLLLe.root',//use process.env.user
    password: process.env.password, //use process.env.password
    database: 'vox_machina', //use your database name using process.env.db
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  module.exports = connection