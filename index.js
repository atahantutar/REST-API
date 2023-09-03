const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const db = require("./config/database");
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ messaage: "asdad" });
});

db();
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
