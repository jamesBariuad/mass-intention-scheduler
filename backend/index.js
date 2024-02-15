const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;

//Schema
const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  contactDetails: {
    type: String,
  },
  intention: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

app.get("/schedule", (req, res) => {
  res.send("Schedule a mass page");
});

app.get("/printScheduledMasses", (req, res) => {
  res.send("Print page");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
