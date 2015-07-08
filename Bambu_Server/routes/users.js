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
  
   connection.query('SELECT appID, facebookID, right FROM User ORDER BY appID desc;', function (error, cursor) {
        
      res.json(cursor);
   });
});

router.post('/', function(req, res, next) {

        connection.query('INSERT INTO User (facebookID, right) VALUES (?, ?);', [req.body.nickname, req.body.content], function (error, info) {

                if (error == null) {

                        connection.query('SELECT * FROM User WHERE appID = ?;', [info.insertId], function (error, cursor) {

                                if (cursor.length > 0) {

                                        var result = cursor[0];

                                        res.json({

                                    result : true,
                                                appID : result.appID,
                                                facebookID : result.facebookID,
                                                right : result.right,
                                        });
                                }
                                else {

                                        res.status(503).json({
                  
                                 result : false,
                                 reason : "Cannot Join"
                              });
                                }
                        });
                }
                else {

                        res.status(503).json(error);
                }
        });
});

module.exports = router;