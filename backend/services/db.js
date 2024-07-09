require("dotenv").config();
const { MongoClient } = require('mongodb');

let singleton;

async function connectToDB() {

    if (singleton) return singleton;

    const client = new MongoClient(process.env.MONGO_HOST);
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

async function findDocuments() {
    try {
        const db = await connectToDB();
        return db.collection("to-do-collection").find().toArray();
    } catch (err) {
        throw new Error(err);
    }
}

async function insertDocuments(document) {
    try {
        const db = await connectToDB();
        return db.collection("to-do-collection").insertOne(document)
    } catch (err) {
        throw new Error(err);
    }
}

async function updateDocument(document) {
    try {
        const db = await connectToDB();
        return db.collection('to-do-collection').updateOne({ _id: document._id }, { $set: document });
    } catch (err) {
        throw new Error(err);
    }

}

async function removeDocument(document) {
    try {
        const db = await connectToDB();
        return db.collection('to-do-collection').deleteOne({ _id: document._id })
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    connectToDB,
    findDocuments,
    insertDocuments,
    updateDocument,
    removeDocument,
};