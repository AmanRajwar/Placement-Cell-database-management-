const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
const db =mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to the database"));

db.once('open',()=>{
    console.log("successfully connected to the database");
});
