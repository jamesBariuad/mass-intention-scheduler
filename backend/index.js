const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const PORT = process.env.PORT || 3000;
const URI = process.env.URI;

mongoose.connect(URI)

//Schema
const scheduleSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
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
app.post('/api/scheduleAMass', async(req,res)=>{
  try {
    const newSched = new Schedule(req.body);
    await newSched.save()
    res.status(201).json(newSched)
  } catch (error) {
    res.status(500).json({ error: 'Failed to Schedule' });
  }
})


app.get('/api/futureSchedules', async(req,res)=>{
  try {
    const currentDate = new Date(); // Get the current date and time

    // Query documents with date greater than current date
    const results = await Schedule.find({ date: { $gt: currentDate } });
    
    // Return the queried documents as JSON response
    res.json(results);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
