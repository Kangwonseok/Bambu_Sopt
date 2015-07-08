var express = require('express');
var mysql = require('mysql');

var router = express.Router();
var connection = mysql.createConnection({

	'host' : 'bambu-sopt.crigi8lwbgkh.us-west-2.rds.amazonaws.com',
	'user' : 'root',
	'password' : 'forestbambu',
	'database' : 'Bambu_Sopt',
});

router.get('/:content_id', function(req, res, next) {
  
	connection.query('SELECT * FROM Bambu_Board WHERE boardID = ?;', [req.params.content_id], function (error, cursor) {

                if (cursor.length > 0) {

                        res.json(cursor[0]);
                }
                else {

                        res.status(503).json({
						
							result : false,
							reason : "Cannot find selected article"
						});
                }
        });
});

router.post('/', function(req, res, next) {

        connection.query('INSERT INTO Bambu_Board (nickname, content) VALUES (?, ?);', [req.body.nickname, req.body.content], function (error, info) {

                if (error == null) {

                        connection.query('SELECT * FROM Bambu_Board WHERE boardID = ?;', [info.insertId], function (error, cursor) {

                                if (cursor.length > 0) {

                                        var result = cursor[0];

                                        res.json({

												result : true,
                                                boardID : result.boardID,
                                                appID : result.appID,
                                                boardname : result.boardname,
                                                nickname : result.nickname,
                                            
                                                timestamp : result.timestamp,
                                                like : result.like,
                                                warn : result.warn,
                                        });
                                }
                                else {

                                        res.status(503).json({
						
											result : false,
											reason : "Cannot post article"
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