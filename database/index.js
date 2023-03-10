const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// user: db1
// pass: fyqsQfEnefDaSOft

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://db1:fyqsQfEnefDaSOft@cluster0.spurzgo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// insert
async function run(){
    try{
        const userCollection = client.db('mongodb').collection('users');
        // get
        app.get('/users', async(req,res)=>{
            const query= {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });
        // update
        app.get('/users/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        app.put('/users/:id',async(req,res) =>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id) };
            const user = req.body;
            const option = {upsert:true};
            const updatedUser = {
                $set:{
                    name: user.name,
                    email: user.email
                }
            }
            const result = await userCollection.updateOne(filter, updatedUser, option);
            res.send(result);
        } )

        // read
        app.post('/users', async(req,res)=>{
        const user = req.body;
        console.log(user);
        const result = await userCollection.insertOne(user)
        res.send(result);
       });

        //delete
       app.delete('/users/:id',async(req,res)=>{
        const id= req.params.id;
        const query = {_id: ObjectId(id)}
        const result = await userCollection.deleteOne(query);
        res.send(result); 
        console.log('trying to delete', id);
       } );
    }
    finally{

    }
}


app.get('/', (req,res)=>{
    res.send('hello from node mongodb');
});

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})
run().catch(err => console.log(err));