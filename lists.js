'use strict';
var mysql = require('mysql2');

const express = require(`express`);
const listsApi = express.Router();

var conn = mysql.createConnection({
  database: 'projet',
  host: "db",
  user: "root",
  password: "root"
});

listsApi.get('/',function (req, res){
  conn.query("SELECT * FROM lists;", function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

listsApi.post('/', function (req, res) {
  let label = req.body.label;
  let description = req.body.description;
  conn.query("INSERT INTO lists(label, description) VALUES (?,?);",[label, description], function (err, fields) {
    if (err) throw err;
    return res.json({
      id: fields.insertId,
      label: label,
      description: description,
    });
  });
});

  module.exports = listsApi;