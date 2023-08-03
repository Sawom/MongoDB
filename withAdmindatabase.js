const express = require('express')
const cors = require('cors');
const admin = require("firebase-admin");
require('dotenv').config();

// eta na dile dot env kaj kore na
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

const serviceAccount = require('./doctors-portal-firebase-adminsdk.json'); //

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// middleware
app.use(cors());
app.use(express.json());

// connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bsdjaxv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

// jwt token verify
async function verifyToken(req, res, next) {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decodedUser = await admin.auth().verifyIdToken(token);
            req.decodedEmail = decodedUser.email;
        }
        catch {

        }

    }
    next();
}

async function run() {
    try {
        await client.connect();
        const database = client.db('doctors_portal');
        const appointmentsCollection = database.collection('appointments');
        const usersCollection = database.collection('users');

        // client side theke token send kortechi
        app.get('/appointments', verifyToken, async (req, res) => {
             // email, date diye filter kortechi
            const email = req.query.email;
            const date = req.query.date;
            // const date = new Date(req.query.appointmentDate) ;
            // const query = { uid: uid, date:date};
            const query = { email: email, date: date }
            const cursor = appointmentsCollection.find(query);
            const appointments = await cursor.toArray();
            res.json(appointments);
        })

         // booking info gula database e send kortechi post diye
        app.post('/appointments', async (req, res) => {
            const appointment = req.body;
            const result = await appointmentsCollection.insertOne(appointment);
            res.json(result)
        });

         // user admin kina verify korbo
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;
            }
            res.json({ admin: isAdmin });
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            console.log(result);
            res.json(result);
        });

        // email database e save korar jnnno
        // upsert mane holo zodi na thake add korbe, thakle add hobe na
        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        });

        // batch 7 theke
        // google login. 
        // google login e email id  dekhacche na. tai email or google er email er uid
        // diye filter kortechi. zodi uid mile tahole add hobe na r id null hole 
        // bujhbo new user r add korbo . client er function ta sociallogin e ache.
        // abar register eo ache oita email diye register korar somoy e use korbo
        app.post('/users', async(req, res)=>{
            const user = req.body;
            const query = {uid: user.uid } ;
            const existingUser = await usersCollection.findOne(query);
            console.log('existingUser', existingUser);
            if(existingUser){
                return res.send({message: 'user already exists' })
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        // jwt token verify korteche
        // user der moddhe admin banacchi
        app.put('/users/admin', verifyToken, async (req, res) => {
            const user = req.body;
            const requester = req.decodedEmail;
            if (requester) {
                const requesterAccount = await usersCollection.findOne({ email: requester });
                if (requesterAccount.role === 'admin') {
                    const filter = { email: user.email };
                    const updateDoc = { $set: { role: 'admin' } };
                    const result = await usersCollection.updateOne(filter, updateDoc);
                    res.json(result);
                }
            }
            else {
                res.status(403).json({ message: 'you do not have access to make admin' })
            }

        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Doctors portal!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})

// app.get('/users')
// app.post('/users')
// app.get('/users/:id')
// app.put('/users/:id');
// app.delete('/users/:id')
// users: get
// users: post
