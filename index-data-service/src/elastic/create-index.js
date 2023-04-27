const elasticClient = require("./elastic-client");

const createIndex = async (indexName) => {
  try {
    await elasticClient.indices.create({ index: indexName });
    console.log(`Index '${indexName}' successfully created`);
  } catch (error) {
    console.error(
      `An error occurred while creating the index '${indexName}': ${error}`
    );
  }
};

module.exports = { createIndex };

// createIndex(indexName);

const deleteIndex = async (indexName) => {
  try {
    await elasticClient.indices.delete({ index: indexName });
    console.log(`Index '${indexName}' successfully deleted.`);
  } catch (error) {
    console.error(
      `An error occurred while deleting the index '${indexName}': ${error}`
    );
  }
};
// deleteIndex("hello");
