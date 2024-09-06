const express = require('express');
const fs = require('fs');
const todos = express.Router()

let data = fs.readFileSync('./db/data.json');
let dataParse = JSON.parse(data);

todos.get('/', function (req, res) {
  res.send( dataParse )
})


module.exports = todos;
