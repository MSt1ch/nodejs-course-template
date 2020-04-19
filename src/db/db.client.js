const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

const connectToDB = cb => {
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log("we're connected!");
    db.dropDatabase();
    User.insertMany([
      { name: 'user1', login: 'admin', password: 'admin' },
      { name: 'user2', login: 'login2', password: 'password222' },
      { name: 'user3', login: 'login3', password: 'password3' }
    ]);
    cb();
  });
};

module.exports = { connectToDB };
