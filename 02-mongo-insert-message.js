const { MongoClient } = require("mongodb");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const CONNECTION_STRING = "mongodb://localhost:27017"; // TODO move to env
const client = new MongoClient(CONNECTION_STRING);

async function run() {
  try {
    await client.connect();
    const database = client.db("chat");
    const messages = database.collection("messages");

    const newMessage = await messages.insertOne({
      from: argv.from,
      text: argv.text,
    });
    console.log(
      `A new message with _id ${newMessage.insertedId} has been created`
    );
    process.exit(0);
  } catch (e) {
    console.error(e);
    await client.close();
  }
}

run().catch(console.dir);
