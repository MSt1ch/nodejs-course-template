const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

const connectToDB = () => {
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log("we're connected!");
  });
};

module.exports = { connectToDB };
