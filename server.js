const path = require('path');

const next = require('next');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

let app = express();
let port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', true);

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(uri, options);

let connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const nextApp = next({ dev: false, dir: './client' });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {

  // --- Your API routes ---
  app.use('/media', require('./routes/media'));
  app.use('/disciplines', require('./routes/disciplines'));
  app.use('/skills', require('./routes/skills'));
  app.use('/tools', require('./routes/tools'));
  app.use('/typesOfMedia', require('./routes/typesOfMedia'));

  // --- Let Next.js handle everything else ---
  app.all('*', (req, res) => handle(req, res));

  app.listen(port, () => console.log(`Server running on ${port}`));
});