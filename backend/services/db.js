const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'to-do-db';
let _db;
let singleton;

async function connectToDB() {

    if (singleton) return singleton;

    const client = new MongoClient(url);
    await client.connect(dbName);
    console.log('Connected successfully to MongoDB server');
    singleton = client.db(dbName);
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


// async function connectToDB() {
//     try {
//         await client.connect();
//         console.log('Connected successfully to MongoDB server');
//         _db = client.db(dbName);
//         return _db;
//     } catch (err) {
//         console.error('Failed to connect to MongoDB:', err);
//         throw err;
//     }
// }

// async function connect() {

//     if (singleton) return singleton;

//     const client = new MongoClient("mongodb://127.0.0.1:27017");
//     await client.connect();

//     singleton = client.db(dbName);
//     return singleton;
// }


/*function connectToDB(callback){
    client.connect();
    console.log('Conectado com sucesso ao servidor');
    const db = client.db(dbName);
    const collection = db.collection('documents');
}*/

// const getDB = () => {
//     if (!_db) {
//         throw new Error('Database not initialized');
//     }
//     return _db;
// };


// const findDocuments = async () => {
//     const collection = _db.collection('to-do-collection');
//     try {
//         const results = await collection.find({}).toArray();
//         return results;
//     } catch (err) {
//         throw new Error(err);
//     }
// };


// const insertDocuments = async (document) => {
//     try {
//         const collection = _db.collection('to-do-collection');
//         const results = await collection.insertOne(document);
//         return results;
//     } catch (err) {
//         throw new Error(err);
//     }
// };

// const updateDocument = async (document) => {
//     try {
//         const collection = _db.collection('to-do-collection');
//         const results = await collection.updateOne({ _id: document._id }, { $set: document });
//         return results;
//     } catch (err) {
//         throw new Error(err);
//     }
// };

// const removeDocument = async (document) => {
//     try {
//         const collection = _db.collection('to-do-collection');
//         const results = await collection.deleteOne({ _id: document._id });
//         return results;
//     } catch (err) {
//         throw new Error(err);
//     }
// };