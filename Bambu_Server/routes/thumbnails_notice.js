var express = require('express');
var mysql = require('mysql');

var router = express.Router();
var connection = mysql.createConnection({

   'host' : 'bambu-sopt.crigi8lwbgkh.us-west-2.rds.amazonaws.com',
   'user' : 'root',
   'password' : 'forestbambu',
   'database' : 'Bambu_Sopt',
});

router.get('/', function(req, res, next) {
  
   connection.query('SELECT * FROM Notice_Board ORDER BY timestamp desc;', function (error, cursor) {
        
      res.json(cursor);
   });
});

module.exports = router;