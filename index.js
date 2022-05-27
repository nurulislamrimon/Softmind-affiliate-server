const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
            const query = { method: 'payment' };
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

        app.delete('/payments/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await dataCollection.deleteOne(query)
            res.send(result);
            console.log(result);
        })
        // expenses
        app.get('/expenses', async (req, res) => {
            const query = { purpose: 'marketing' };
            const cursor = dataCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
            console.log(result);
        })

        app.post('/expenses', async (req, res) => {
            const newExpense = req.body;
            const result = await dataCollection.insertOne(newExpense);
            console.log(result);
            res.send(result);
        })

        app.delete('/expenses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await dataCollection.deleteOne(query)
            res.send(result);
            console.log(result);
        })

    } finally { }

}
run().catch(console.log)


app.listen(port, () => {
    console.log(`Port ${port} is responding`);
})