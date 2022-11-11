const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8jr6sk9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("reddy_customs").collection("services");

    app.get("/all-services", (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = cursor.toArray();

      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("reddy_customs server is running");
});

app.listen(port, () => {
  console.log(`reddy_customs listening on port ${port}`);
});
