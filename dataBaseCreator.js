var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PW@mysql_root",
  
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE constructionItems", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});