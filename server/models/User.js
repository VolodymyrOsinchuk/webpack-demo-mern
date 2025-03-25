const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  date: {type: Date, default: Date.now}
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;