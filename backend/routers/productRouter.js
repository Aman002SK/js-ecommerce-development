const express = require('express');
const axios = require('axios');

const Product = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../utils');

const productRouter = express.Router();

productRouter.use(isAuth);

productRouter.get(
  '/:page',
  expressAsyncHandler(async (req, res) => {
    // const response = await axios({
    //   url: 'https://fakestoreapi.com/products',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const products = response.data;
    // console.log(products);
    // Product.insertMany(products, (err, data) => {
    //   if (err) console.log(err);

    //   console.log(data);
    // });

    try {
      const page = req.params.page;
      //console.log(page);
      const count = await Product.count({});
      const products = await Product.find()
        .skip(5 * page)
        .limit(5)
        .exec();

      if (!products) {
        res.status(404).json({ message: 'products not found' });
      }

      res.send({ products: products, count: count });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  })
);

productRouter.get(
  '/one/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const myId = req.params.id;
      const product = await Product.findById(myId);
      if (product) {
        res.send(product);
      } else {
        res.status(404).json({ message: 'products not found' });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  })
);

productRouter.post(
  '/filter',
  expressAsyncHandler(async (req, res) => {
    // console.log(req);
    try {
      let filter = req.body.filter;
      let page = req.body.currentPage;
      let search = req.body.search;
      let field = req.body.field;
      let sortType = req.body.sortType;

      let products;
      let count;

      if (filter || sortType || field) {
        let sortQuery =
          field && sortType
            ? {
                [field]: sortType,
              }
            : {};

        let query =
          filter && filter.toLowerCase() !== 'all'
            ? {
                category: filter.toLowerCase(),
              }
            : {};

        count = await Product.count(query);

        products = await Product.find(query)
          .sort(sortQuery)
          .skip(5 * page)
          .limit(5);
      }

      if (search) {
        count = await Product.count({
          title: { $regex: search, $options: 'i' },
        });

        products = await Product.find({
          title: { $regex: search, $options: 'i' },
        })
          .skip(5 * page)
          .limit(5)
          .exec();
      }

      if (!filter && !search && !sortType && !field) {
        products = await Product.find({})
          .skip(5 * page)
          .limit(5);

        count = await Product.count({})
          .skip(5 * page)
          .limit(5);
      }

      return res.json({ products: products, count: count });
    } catch (error) {
      return res
        .status(500)
        .send({ status: 'error', message: 'Internal Server Error' });
    }
  })
);

// productRouter.post(
//   '/search',
//   expressAsyncHandler(async (req, res) => {
//     let search = req.body.search;
//     let page = req.body.currentPage;
//     console.log(search);
//     const count = await Product.count({
//       title: { $regex: search, $options: 'i' },
//     });
//     const products = await Product.find({
//       title: { $regex: search, $options: 'i' },
//     })
//       .skip(5 * page)
//       .limit(5)
//       .exec();

//     return res.send({ products: products, count: count });
//   })
// );

module.exports = productRouter;
