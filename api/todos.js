const express = require('express');
const todos = express.Router()
const { MongoClient } = require('mongodb');

const dbName = 'todos';
// const url = 'mongodb+srv://minkyu:abcdef2397@minkyu.rlol7cf.mongodb.net/?retryWrites=true&w=majority&appName=minkyu';
const url = 'mongodb+srv://yicha7:test1234@cluster2.kjcecrw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2';
const client = new MongoClient(url);

async function connect(){
    await client.connect();
    const db = client.db(dbName);

    return db.collection('data');
}

todos.get('/', async function (req, res) {
    const collection = await connect();   
    const findResult = await collection.find({}).toArray();
    client.close();

    res.send( findResult )
})
todos.get('/:id', async function (req, res) {
    let id = req.params;
    
    const collection = await connect();   
    const findResult = await collection.find(id).toArray();
    client.close();

    res.send( findResult )
})

todos.post('/', async function (req, res) {
    const collection = await connect();   
                       await collection.insertOne(req.body);
    client.close();
    res.send('done');
})


todos.put('/', async function (req, res) {
    console.log(req.body)
    const collection = await connect();   
                       await collection.updateOne({id:req.body.id},{$set:req.body});
    client.close();

    res.send('done');
})

todos.delete('/', async function (req, res) {

    const collection = await connect();   
                       await collection.deleteOne(req.query);
    client.close();
    res.send('done');
})

module.exports = todos;
