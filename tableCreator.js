var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PW@mysql_root",
  database: "constructionItems"
  
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE TABLE bricks (id INT AUTO_INCREMENT PRIMARY KEY, purchase_data DATE NOT NULL,quantity VARCHAR(100) NOT NULL, cost INT NOT NULL)", function (err, result) {
    if (err) throw err;
    console.log("bricks TABLE created");
  });
});