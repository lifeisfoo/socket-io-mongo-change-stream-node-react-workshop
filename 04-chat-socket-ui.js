/*
 * HTTP SERVER - UI ONLY
 */
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.use("/", express.static("ui/dist"));
server.listen(3000, () => {
  console.log("listening on *:3000");
});

/*
 * MONGO
 */
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

async function getMessages() {
  const collection = client.db("chat").collection("messages");
  const messagesCursor = await collection.find({});
  return await messagesCursor.toArray();
}

async function addMessage(msg) {
  const collection = client.db("chat").collection("messages");
  const insRes = await collection.insertOne(msg);
  return { ...msg, _id: insRes.insertedId };
}

/*
 *SOCKET.IO
 */
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", async (socket) => {
  io.emit("chat history", await getMessages());
  socket.on("chat message", async (msg) => {
    console.log("chat message: saving, " + JSON.stringify(msg));
    const newMsg = await addMessage(msg);
    io.emit("chat message", newMsg);
  });
});
