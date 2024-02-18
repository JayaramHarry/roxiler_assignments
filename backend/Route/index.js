const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./Config/db.js");
const { Transaction } = require("./Route/Get_Transaction.js");
const { Barchart } = require("./Route/BarChart.Route.js");
const { Statistics_Transaction } = require("./Route/Statistics.js");
app.use(cors());
const app = express();
app.use(express.json());
app.use("/", Transaction);
app.use("/", Statistics_Transaction);
app.use("/", Barchart);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(`something wrong with DB ${err}`);
  }
  console.log(`server is listening on port ${process.env.PORT}`);
});
//change
