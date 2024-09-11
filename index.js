const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const todos = require('./api/todos');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

todos().then(todosRouter => {
    app.use('/todos', todosRouter);
    app.listen(4000);
})
   
