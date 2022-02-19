
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PW@mysql_root",
  database: "constructionItems"  
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))



app.get('/', (req,res) =>{
	res.sendFile(__dirname + '/index.html');
})

app.get('/sand', (req,res) =>{
  res.sendFile(__dirname + '/sand.html');
  
})

app.get('/cement', (req,res) =>{
  res.sendFile(__dirname + '/cement.html');
  
})

app.get('/bricks', (req,res) =>{
  res.sendFile(__dirname + '/bricks.html');
  
})



var server = http.listen(3000, () => {
  console.log('server is running');
});

app.get('/sandSummary', (req, res) => {
  console.log("sandlist sent")
  con.connect(function(err) {
  if (err) console.log(err);

  con.query("SELECT SUM(quantity) as total_quantity FROM sand", function (err, result, fields) {
    if (err) throw err;
    
  con.query("SELECT SUM(cost) as total_cost FROM sand", function (err, result2, fields) {
    if (err) throw err;
    console.log("result2:")
    
    result.push(result2[0])
    
    res.send(result);
    })
  })
})
})

app.get('/cementSummary', (req, res) => {
  
  con.connect(function(err) {
  if (err) console.log(err);

  con.query("SELECT SUM(quantity) as total_quantity FROM cement", function (err, result, fields) {
    if (err) throw err;
    
  con.query("SELECT SUM(cost) as total_cost FROM cement", function (err, result2, fields) {
    if (err) throw err;
    
    result.push(result2[0])
    
    res.send(result);
    })
  })
})
})

app.get('/bricksSummary', (req, res) => {
  
  con.connect(function(err) {
  if (err) console.log(err);

  con.query("SELECT SUM(quantity) as total_quantity FROM bricks", function (err, result, fields) {
    if (err) throw err;
    
  con.query("SELECT SUM(cost) as total_cost FROM bricks", function (err, result2, fields) {
    if (err) throw err;
    
    result.push(result2[0])
    
    res.send(result);
    })
  })
})
})


app.get('/sandlist', (req, res) => {
  
  con.connect(function(err) {
  if (err) console.log(err);

  con.query("SELECT * FROM sand", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    })
  })
})

app.get('/cementlist', (req, res) => {
  
  con.connect(function(err) {
    if (err) console.log(err);

    con.query("SELECT * FROM cement", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      })
  })
})

app.get('/brickslist', (req, res) => {
  
  con.connect(function(err) {
  if (err) console.log(err);

  con.query("SELECT * FROM bricks", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    })
  })
})

app.post('/sandAdd', async (req, res) => {
  try{
    
    var purchase_data = req.body.purchase_data;
    var quantity = req.body.quantity;
    var cost = req.body.cost;
    var sql = `INSERT INTO sand (purchase_data, quantity, cost) VALUES ( ?,?,?)`;
    
    con.query(sql, [purchase_data, quantity, cost], function (err, result, fields) {
      if (err){ console.log(err);}
      else{ console.log("added to table");
        res.sendStatus(200);
      }
    })
    
  }
  catch (error){
    res.sendStatus(500);
    
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})

app.post('/cementAdd', async (req, res) => {
  try{

    var purchase_data = req.body.purchase_data;
    var quantity = req.body.quantity;
    var cost = req.body.cost;
    var sql = `INSERT INTO cement (purchase_data, quantity, cost) VALUES ( ?,?,?)`;
    
    con.query(sql, [purchase_data, quantity, cost], function (err, result, fields) {
      if (err){ console.log("err");}
      else{ console.log("added to table");  
        res.sendStatus(200);
      }
    })
  }
  catch (error){
    res.sendStatus(500);
    
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})

app.post('/bricksAdd', async (req, res) => {
  try{
    
    
    var purchase_data = req.body.purchase_data;
    var quantity = req.body.quantity;
    var cost = req.body.cost;

    var sql = `INSERT INTO bricks (purchase_data, quantity, cost) VALUES ( ?,?,?)`;
    
    con.query(sql, [purchase_data, quantity, cost], function (err, result, fields) {
      if (err){ console.log(err);}
      else{ console.log("added to table");
        
        res.sendStatus(200);
      }
    })
    
  }
  catch (error){
    res.sendStatus(500);
    
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})


