const express = require('express');

const app = express()

const port = process.env.PORT || 5000


const cors = require("cors")

const jwt = require("jsonwebtoken")


app.use(cors())

app.use(express.json())


// here is the mongodb part



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://app:app@cluster0.iqgllty.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const Db = client.db("posts").collection("post")



        // here is teh get request
        app.get("/posts", async (req, res) => {


            const finding = Db.find()

            const result = await finding.toArray()

            res.send(result)g


        })
        // here is teh get request ends

        // here is teh all rest apis 
        app.post('/post', async (req, res) => {

            const post = req.body

            const result = await Db.insertOne(post)

            res.send(result)

        })
        // here is teh all rest apis  ends

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// here is the mongodb part ends









// here is the main basic response
app.get('/', (req, res) => {
    res.send("server is running")
})

app.listen(port, () => {
    console.log(`server is running on post ${port}`);
})