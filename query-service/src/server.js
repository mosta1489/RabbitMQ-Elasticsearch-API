const express = require("express");
const elasticClient = require("./elastic-client");
require("dotenv").config();
const app = express();

const indexName = process.env.INDEX_NAME;
console.log("indexName >>> ", indexName);
const PORT = process.env.MAIN_PORT;

app.use((req, res, next) => {
  console.log(req.method, req.body, req.query);
  next();
});

app.get("/search-name", async (req, res) => {
  const result = await elasticClient.search({
    index: indexName,
    query: { match_phrase_prefix: { name: req.query.name } },
  });
  res.json(result);
});

app.get("/search-about", async (req, res) => {
  const result = await elasticClient.search({
    index: indexName,
    query: { match_phrase_prefix: { about: req.query.about } },
  });
  res.json(result);
});

app.get("/all", async (req, res) => {
  const result = await elasticClient.search({
    index: indexName,
    query: { match_all: {} },
  });

  res.send(result);
});

app.delete("/index", async (req, res) => {
  await elasticClient.indices.delete({
    index: indexName,
  });
  +res.send("Index deleted");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} ...`));
