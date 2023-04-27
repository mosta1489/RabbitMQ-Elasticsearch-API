const amqp = require("amqplib/callback_api");
require("dotenv").config();

const QUEUE_URL = process.env.QUEUE_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

const sendToQueue = async (data) => {
  return new Promise((resolve, reject) => {
    amqp.connect(QUEUE_URL, function (error0, connection) {
      if (error0) {
        reject(error0);
      }

      connection.createChannel(function (error1, channel) {
        if (error1) {
          reject(error1);
        }

        channel.assertQueue(QUEUE_NAME, {
          durable: false,
        });

        channel.sendToQueue(QUEUE_NAME, Buffer.from(data));
        console.log(" [x] Sent to queue✅✅ %s");
      });

      setTimeout(function () {
        connection.close();
      }, 500);

      resolve();
    });
  });
};

module.exports = {
  sendToQueue,
};
