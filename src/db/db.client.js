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

  db.once('open', async () => {
    console.log("we're connected!");
    await db.dropDatabase();
    await User.create({
      password: 'admin',
      login: 'admin'
    });
    cb();
  });
};

module.exports = { connectToDB };
