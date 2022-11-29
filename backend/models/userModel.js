const mongoose = require('mongoose');

// const cartSchema = mongoose.Schema({
//   id: Number,
//   title: String,
//   image: String,
//   description: String,
//   price: Number,
//   category: String,
//   qty: Number,
//   rating: {
//     rate: Number,
//     count: Number,
//   },
// });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, index: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  cart: [],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
