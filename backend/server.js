const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');
const productRouter = require('./routers/productRouter');
const { json } = require('express');
// const data = require("./data/data");
const path = require('path');
const User = require('./models/userModel');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err.reason);
  })
  .then(() => {
    console.log('connected to DB');
  });

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id == req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "product not found!" });
//   }
// });

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(5000, () => {
  console.log('server is running on 5000');
});
