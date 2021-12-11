const mongoose = require('mongoose');
const config = require('../config');

const connect = () => {
  mongoose.connection.on("error", (err) => {
    console.log(`DB Connection failed: ${err}`);
  });
  mongoose.connection.once("open", () => {
    console.log("Connection to MongoDB established");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Connection to MongoDB closed");
  })
  return mongoose.connect(config.mongoUrl(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  });      
}

module.exports = {
  connect
}
