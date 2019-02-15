const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
