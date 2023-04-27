require("dotenv").config();
var amqp = require("amqplib/callback_api");
const { createIndex } = require("./elastic/create-index");
const { indexData } = require("./elastic/index-data");

const QUEUE_URL = process.env.QUEUE_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;
const INDEX_NAME = process.env.INDEX_NAME;
console.log("indexName >>> ", INDEX_NAME);
// create index if not exists
try {
  createIndex(INDEX_NAME);
} catch (error) {
  console.log(error.message);
}

amqp.connect(QUEUE_URL, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      cd;
      throw error1;
    }

    channel.assertQueue(QUEUE_NAME, {
      durable: false,
    });

    console.log(
      " [*] Waiting for messages in %s. To exit press CTRL+C",
      QUEUE_NAME
    );

    channel.consume(
      QUEUE_NAME,
      function (msg) {
        console.log(" [x] Received  %s ✅⬇️⬇️✅");
        const data = msg.content.toString();

        // send data to elastic search
        indexData(data, INDEX_NAME);
      },
      {
        noAck: true,
      }
    );
  });
});
