const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const mongooseUrl =process.env.MONGODB_URI ||  "mongodb+srv://workUsage:workusage@cluster0.ldmpa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Connect to MongoDB
console.log(mongooseUrl);

mongoose.connect("mongodb+srv://workUsage:workusage@cluster0.ldmpa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Connect to MongoDB
  , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));