const { MongoClient } = require("mongodb");

const CONNECTION_STRING = "mongodb://localhost:27017"; // TODO move to env
const client = new MongoClient(CONNECTION_STRING);

async function run() {
  try {
    // connection
    await client.connect();
    // db selection
    const database = client.db("chat");
    // collection selection
    const messages = database.collection("messages");

    // query
    const query = { from: "Alessandro" };
    const message = await messages.findOne(query);

    // log and exit
    console.log(message);
    process.exit(0);
  } catch (e) {
    // close connection on error
    console.error(e);
    await client.close();
  }
}

run().catch(console.dir);
