// Create web server
// 1. npm install express
// 2. npm install body-parser
// 3. npm install ejs
// 4. npm install mysql

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var mysql = require('mysql');

app.set('view engine', 'ejs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'comments'
});

app.get('/', function(req, res) {
    connection.query('SELECT * FROM comments', function(err, results) {
        res.render('index', {comments: results});
    });
});

app.post('/add', function(req, res) {
    var comment = req.body.comment;
    connection.query('INSERT INTO comments (comment) VALUES (?)', [comment], function(err, result) {
        res.redirect('/');
    });
});

app.listen(3000, function() {
    console.log('Server running at http://localhost:3000');
});

// Create database
// CREATE DATABASE comments;

// Create table
// CREATE TABLE comments (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     comment TEXT
// );

// Insert data
// INSERT INTO comments (comment) VALUES ('