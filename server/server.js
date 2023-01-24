const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

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

let mediaRouter = require('./routes/media');
let disciplinesRouter = require('./routes/disciplines');
let skillsRouter = require('./routes/skills');
let toolsRouter = require('./routes/tools')
let typeOfMediaRouter = require('./routes/typesOfMedia');

app.use('/media', mediaRouter);
app.use('/disciplines', disciplinesRouter);
app.use('/skills', skillsRouter);
app.use('/tools', toolsRouter);
app.use('/typesOfMedia', typeOfMediaRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});