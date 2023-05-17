const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { MongoClient } = require("mongodb");

const CONNECTION_STRING = "mongodb://localhost:27017"; // TODO move to env
const client = new MongoClient(CONNECTION_STRING);

async function connect() {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
    await client.close();
    process.exit(0);
  }
}
connect().catch(console.dir);

app.use(express.json()); // for parsing application/json
app.get("/messages", async (req, res) => {
  const collection = client.db("chat").collection("messages");
  const messagesCursor = await collection.find({});
  res.json(await messagesCursor.toArray());
});

app.post("/messages", async (req, res) => {
  const collection = client.db("chat").collection("messages");
  const newMessage = await collection.insertOne({
    from: req.body.from,
    text: req.body.text,
  });
  res.json(newMessage);
});

app.use("/", express.static("ui/dist"));

server.listen(3000, () => {
  console.log("listening on *:3000");
});
