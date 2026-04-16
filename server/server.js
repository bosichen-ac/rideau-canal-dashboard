const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { CosmosClient } = require("@azure/cosmos");

const app = express();
app.use(cors());

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY
})

const database = client.database(process.env.COSMOS_DATABASE);
const container = database.container(process.env.COSMOS_CONTAINER);


app.get("/", (req, res) => {
  res.send("API...");
});

app.get("/api/analytics", async (req, res) => {
  try {
    const query = {
      query: "SELECT * FROM c ORDER BY c.windowEnd DESC"
    };

    const { resources } = await container.items.query(query).fetchAll();

    res.json(resources);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});