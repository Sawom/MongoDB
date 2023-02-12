const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// middleware
app.use(cors());
app.use(express.json());

// { connect database

const uri = "mongodb+srv://example:ANflqWAJo3uqPco6@cluster0.spurzgo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// }
async function run(){
    // insert one
    try{
        const dbCollection = client.db("exampleDatabase").collection("data");
        // read data from database. home e ekhane read kortechi client site theke
        app.get('/data', async(req,res)=>{
            const query = {};
            const cursor = dbCollection.find(query);
            const users = await cursor.toArray();
            res.send(users); // users/ user egula variable
        } )


        // ekhane '/data' mane route name r ekhane data k post kortechi.
        // client er fetch r ekhane post er por '/add' route same hoite hoy.
        app.post('/data', async (req, res) =>{
            // data k nicchi body te. body client theke ashche
            const user = req.body;
            const result = await dbCollection.insertOne(user);
            res.send(result);
            console.log(user);
        } );

        // delete
        app.delete('/data/:id', async (req, res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            console.log(query);
            const result = await dbCollection.deleteOne(query);
            console.log('deleting user with id', id);
            res.json(result);
        } );

        // update
        app.get('/data/:id' , async(req, res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await dbCollection.findOne(query);
            res.send(result);
            console.log(result);
        } )


    }
    finally{
        
    }
}


app.get('/', (req,res)=>{
    res.send("hello from mongo");
})

app.listen(port, ()=>{
    console.log(`listen from port ${port}`);
})
// add must
run().catch( err =>console.log(err));