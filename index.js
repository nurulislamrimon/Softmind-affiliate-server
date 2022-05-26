const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_mail}:${process.env.DB_pass}@cluster0.n9ujq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const dataCollection = client.db("softmindAffiliate").collection("data");

        app.get('/payments', async (req, res) => {
            const query = {};
            const cursor = dataCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
            console.log(result);
        })

        app.post('/payments', async (req, res) => {
            const newPayment = req.body;
            const result = await dataCollection.insertOne(newPayment);
            console.log(result);
            res.send(result);
        })




    } finally { }

}
run().catch(console.log)



app.get('/', (req, res) => {
    res.send({ thank: 'user' })
    console.log('responding from home');
})
app.listen(port, () => {
    console.log(`Port ${port} is responding`);
})