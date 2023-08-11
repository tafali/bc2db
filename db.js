const mysql      = require('mysql');
const util = require("util"); 

require('dotenv').config();

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'bc2db',
  password : process.env.DBPASS,
  database : 'bc2db'
});

connection.query = util.promisify(connection.query).bind(connection);

connection.connect(function(err) {
    if (err) {
        console.error('error : ' + err.stack);
        return;
    }

    console.log('connected : ' + connection.threadId);
});

module.exports = connection;