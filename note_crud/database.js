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
// zokhn database connect korbo tokhn run function likhte hobe
async function run(){
    // insert one
    try{
        const dbCollection = client.db("exampleDatabase").collection("data");
        // read data from database and also show in /browser. home e ekhane read kortechi client site theke
        app.get('/data', async(req,res)=>{
            const query = {};
            const cursor = dbCollection.find(query);
            const users = await cursor.toArray();
            res.send(users); // users/ user egula variable
        } )


        // ekhane '/data' mane route name r ekhane data k post kortechi.data insert
        // client er fetch r ekhane post er por '/add' route same hoite hoy.
        app.post('/data', async (req, res) =>{
            // data k nicchi body te. body client theke ashche
            const user = req.body;
            const result = await dbCollection.insertOne(user);
            res.send(result);
            console.log(user);
        } );

        // update user info by form
        app.put('/data/:id', async (req,res)=>{
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = {upsert: true};
            const updateDoc ={
                $set:{
                    name: updatedUser.name,
                    email: updatedUser.email,
                    address: updatedUser.address 
                },
            };
            const result = await dbCollection.updateOne(filter, updateDoc, options)
            console.log('updating user', id);
            res.json(result);
        })

        // delete
        app.delete('/data/:id', async (req, res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            console.log(query);
            const result = await dbCollection.deleteOne(query);
            console.log('deleting user with id', id);
            res.json(result);
        } );


        // update: delete korar por zei data thake oigular update
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
// add must. app listen korar somoy lagbe na. eta lagbe zokhn run function likhbo tokhn
run().catch( err =>console.log(err));
