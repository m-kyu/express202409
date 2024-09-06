const express = require('express');
const fs = require('fs');
const todos = express.Router()

todos.get('/', function (req, res) {
  res.send( 'Hello' )
})

module.exports = todos;
