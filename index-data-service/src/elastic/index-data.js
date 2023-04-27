const elasticClient = require("./elastic-client");

const indexData = async (data, indexName) => {
  jsonData = JSON.parse(data);

  // add timestamp field to data
  const timestamp = new Date();
  jsonData.timestamp = timestamp;
  try {
    await elasticClient.index({
      index: indexName,
      document: jsonData,
    });
    console.log(" [x] indexed  %s ✅➡➡✅");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { indexData };
