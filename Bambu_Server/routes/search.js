var express = require('express');
var mysql = require('mysql');

var router = express.Router();
var connection = mysql.createConnection({

   'host' : 'bambu-sopt.crigi8lwbgkh.us-west-2.rds.amazonaws.com',
   'user' : 'root',
   'password' : 'forestbambu',
   'database' : 'Bambu_Sopt',
});


router.get('/:search_word', function(req, res, next) {                          // 검색 
  
   connection.query('SELECT * FROM Total_Board WHERE content LIKE "%?%";',
                    [req.params.search_word], function (error, cursor) {

                if (cursor.length > 0) {

                        res.json(cursor[0]);
                }
                else {
                    
                    res.status(503).json({
                        
                        result : false,
                        reason : "Cannot search with typed word"
                  });
                }
        });
});
     