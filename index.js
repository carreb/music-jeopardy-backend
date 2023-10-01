const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
  console.log("Database connection failed");
});
db.once("open", () => console.log("Database connection successful"));

app.use(express.json());
app.use(cors());

// internal routes
const songs = require("./routes/songs");

app.use("/songs", songs);

app.listen(4452, () => console.log("Active on PORT 4452"));
