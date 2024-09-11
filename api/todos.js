const express = require('express');
const { MongoClient } = require('mongodb');
const Router = express.Router()

const dbName = 'todos';
const url = 'mongodb+srv://yicha7:test1234@cluster2.kjcecrw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2';
const client = new MongoClient(url);

let collection;
async function todos(){
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection('data');
   
    Router.get('/', async function (req, res) {
        const findResult = await collection.find({}).toArray();
        res.send( findResult )
    })

    Router.get('/:id', async function (req, res) {
        let id = req.params;
        const findResult = await collection.find(id).toArray();

        res.send( findResult )
    })

    Router.post('/', async function (req, res) {
        await collection.insertOne(req.body);
        res.send('done');
    })


    Router.put('/', async function (req, res) {
        await collection.updateOne({id:req.body.id},{$set:req.body});
        res.send('done');
    })

    Router.delete('/', async function (req, res) {
        await collection.deleteOne(req.query);
        res.send('done');
    })
    return Router;
}

module.exports = todos;
