const uuid = require('uuid');
const mongoose = require('mongoose');

// class User {
//   constructor({ id = uuid(), name, login, password } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }
//
//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
// }

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
