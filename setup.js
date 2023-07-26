const express = require('express');
const cors = require('cors');
const port = process.env.port || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.send('doctors portal running');
})

app.listen(port, ()=> console.log(`doctor portal server running at ${port}` ) )