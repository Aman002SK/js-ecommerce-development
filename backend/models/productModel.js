const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String, required: true },
  rating: { type: Object, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
