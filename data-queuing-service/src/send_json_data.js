const { sendToQueue } = require("./send");
const path = require("path");
const fs = require("fs");
const dataPath = path.join(__dirname, "../data.json");
dataFile = fs.readFileSync(dataPath);
jsonData = JSON.parse(dataFile);

const sendJsonData = async () => {
  for (const doc of jsonData) {
    await sendToQueue(JSON.stringify(doc))
      .then(() => {})
      .catch((err) => {
        console.log("Error sending data to queue", err.message);
      });
  }
};

module.exports = { sendJsonData };
