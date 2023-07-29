const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI);
const db =mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to the database"));

db.once('open',()=>{
    console.log("successfully connected to the database");
});
