const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: false, // Remove this line as it's deprecated
  createIndexes: true, // Add this line to enable index creation
})
const db =mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to the database"));

db.once('open',()=>{
    console.log("successfully connected to the database");
});
