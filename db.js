const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'bc2db',
  password : 'password',
  database : 'bc2db'
});

connection.connect(function(err) {
    if (err) {
        console.error('error : ' + err.stack);
        return;
    }

    console.log('connected : ' + connection.threadId);
});

module.exports = connection;