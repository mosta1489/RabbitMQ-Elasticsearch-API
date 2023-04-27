const express = require("express");
const { sendToQueue } = require("./send");
require("dotenv").config();
const { sendJsonData } = require("./send_json_data");

// ===== Send JSON data to queue =====
sendJsonData();
// ===================================

const PORT = process.env.DATA_QUEUING_PORT;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, " >> ", req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from data queuing service");
});

app.post("/send", async (req, res) => {
  const { data } = req.body;

  await sendToQueue(JSON.stringify(data))
    .then(() => {
      res.send("Data sent to queue successfully ✅⬆⬆✅ ");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error sending data to queue");
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} ...`);
});
