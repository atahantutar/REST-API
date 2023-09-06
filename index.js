const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const db = require("./config/database");
const Auth = require("./routes/auth.js");
const post = require("./routes/post.js");
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", Auth);
app.use("/", post);

db();
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
