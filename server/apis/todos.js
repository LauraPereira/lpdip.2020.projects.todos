'use strict';
var mysql = require('mysql2');

const express = require(`express`);
const todosApi = express.Router();

var conn = mysql.createConnection({
  database: 'projet',
  host: "db",
  user: "root",
  password: "root"
});

todosApi.put('/', function (req, res) {
  let label = req.body.label;
  let description = req.body.description;

  conn.query("UPDATE lists SET label=? AND description=?;", [label], [description], function (err, fields) {
    if (err) throw err;
    return res.json({
      id: fields.insertId,
      label: label,
      description: description,
    });
  });
});
  
todosApi.get('/',function (req, res){
  var test={};
  var test2=[];
  conn.query("SELECT * FROM todos;", function(err, rows, fields) {
    if (err) throw err;
    for (var i=0; i<rows.length; i++){
      var isDone=rows[i].isDone;
      if(isDone=0){
        isDone=false;
      } else {
        isDone=true;
      }
      test={
        id: rows[i].id,
        label : rows[i].label,
        idList: rows[i].idList,
        isDone: isDone,
      };
      test2.push(test);
    }
    return res.json(test2);
  });
});

todosApi.post('/', function (req, res) {
  let label = req.body.label;
  let idList = req.body.idList;
  conn.query("INSERT INTO todos(label, idList, isDone) VALUES (?,?,0);",[label], [idList], function (err, fields) {
    console.log(fields);
    if (err) throw err;
    return res.json({
      id: fields.insertId,
      label: label, 
      idList:req.params.id,
      isDone:false,
    });
  });
});

todosApi.put('/', function (req, res) {
  lab:req.body.label
  lab:req.body.isDone

  conn.query("UPDATE todos SET label=? AND isDone=?;", [label], [isDone], function (err, fields) {
    if (err) throw err;
    return res.json({
      id: fields.insertId,
      label: label,
      idList: req.params.id,
      isDone:isDone,
    });
  });
});

todosApi.delete('/', function (req, res) {
    
    conn.query("DELETE FROM todos;", function (err, fields) {
      if (err) throw err;
      console.log("1 enregistrement effectué.")
    });
  });

  module.exports = todosApi;