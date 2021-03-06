var express = require('express');
var mysql = require('mysql');

var router = express.Router();
var connection = mysql.createConnection({

   'host' : 'bambu-sopt.crigi8lwbgkh.us-west-2.rds.amazonaws.com',
   'user' : 'root',
   'password' : 'forestbambu',
   'database' : 'Bambu_Sopt',
});

// Bambu 게시판의 게시글에 대한 함수들

router.get('/:board_id', function(req, res, next) {  
    // Bambu 게시판에 있는 몇 번 게시글 상세보기 
  
   connection.query('SELECT * FROM Notice_Board WHERE boardID = ?;',
                    [req.params.board_id], function (error, cursor) {

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
    // Bambu 게시판에 새로운 글 추가

        connection.query('INSERT INTO Notice_Board (nickname, content) VALUES (?, ?);',
                         [req.body.nickname, req.body.content], function (error, info) {

                if (error == null) {
                    
                    connection.query('SELECT * FROM Notice_Board ORDER BY timestamp desc;', function (error, cursor) {
        
                    res.json(cursor);
                    });

                        
                }
                else {
                    
                    res.status(503).json(error);
                }
        });
});

router.post('/:board_id/update', function(req, res, next) {     // Bambu 게시판에 올라와 있는 글 수정

        connection.query('UPDATE Thunder_Board SET nickname=?, content=? WHERE boardID=?;', 
                         [req.body.nickname, req.body.content, req.params.board_id]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});

router.get('/:board_id/delete', function(req, res, next) {      // Bambu 게시판에 존재하는 게시글 삭제

        connection.query('DELETE from Notice_Board WHERE boardID=?;', 
                         [req.params.board_id]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});

// Bambu 게시판의 댓글에 대한 함수들

router.get('/:board_id/comment', function(req, res, next) {     // Bambu 게시판에 몇번 게시글의 댓글 보기
    
    connection.query('SELECT * FROM Notice_Comment WHERE boardID=?;',
                     [req.params.board_id], function (error, cursor) {
        
        res.json(cursor);
    });
});

router.post('/:board_id/comment/post', function(req, res, next) {
    connection.query('INSERT INTO Notice_Comment (nickname, content, boardID) VALUES (?, ?, ?);',
                         [req.body.nickname, req.body.content, req.params.board_id], function (error, info) {
        
        if (error == null) {
                    
                    connection.query('SELECT * FROM Notice_Comment ORDER BY timestamp asc;', function (error, cursor) {
                        
                        res.json(cursor);
                });
            }
        else {
            
            res.status(503).json(error);
            
        }
    });
});

router.post('/:board_id/comment/update/:comment_id', function(req, res, next) {     // Bambu 게시판에 몇번 게시글에 달린 특정 댓글 수정

        connection.query('UPDATE Notice_Comment SET nickname=?, content=? WHERE boardID=? AND commentID=?;', 
                         [req.body.nickname, req.body.content, req.params.board_id, req.params.comment_id]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});

router.get('/:board_id/comment/delete/:comment_id', function(req, res, next) {      // Bambu 게시판에 몇번 게시글에 달린 특정 댓글 삭제

        connection.query('DELETE FROM Notice_Comment WHERE boardID=? AND commentID=?;', 
                         [req.params.board_id, req.params.comment_id]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});
                
router.post('/:board_id/good', function(req, res, next) {     // Bambu 게시판에 좋아요 수 증가
    
        connection.query('UPDATE Notice_Board SET good=good+1 WHERE boardID=?;', 
                         [req.params.board_id],function (error, result) {

                if (error) {
                    
                    throw error;            
                }
                else {

                    res.json({status: "SUCCESS"});
                }
        });   
}); 

router.post('/:board_id/warn', function(req, res, next) {     // Bambu 게시판에 신고 수 증가

        connection.query('UPDATE Notice_Board SET warn=warn+1 WHERE boardID=?;', 
                         [req.params.board_id]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});

module.exports = router;