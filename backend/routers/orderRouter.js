const express = require('express');
const expressAsyncHandler = require('express-async-handler');
// import Order from '../models/userModel';
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const { isAuth } = require('../utils');
const mongoose = require('mongoose');

const orderRouter = express.Router();

orderRouter.use(isAuth);

orderRouter.get(
  '/mine',

  expressAsyncHandler(async (req, res) => {
    // console.log('sui');
    console.log(req.user._id);
    try {
      const user = await User.findOne({ email: req.user.email });
      const orders = await Order.find({ user: user._id });
      //console.log({ orders });
      res.send(orders);
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message });
    }
  })
);

orderRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    // console.log(req.params.id);
    let order;
    try {
      order = await Order.findById(req.params.id);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }

    //console.log(order);
    if (order) {
      // console.log('sui');
      res.send(order);
    } else {
      res.status(404).send({ message: 'order not found' });
    }
  })
);

orderRouter.post(
  '/',

  expressAsyncHandler(async (req, res) => {
    try {
      const orders = new Order({
        orderItems: req.body.orderItems,
        user: req.body.name,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
      });

      const createdOrder = await orders.save();
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    } catch (error) {
      res.status(500).send({ message: 'order cannot be created' });
    }
  })
);

orderRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        const deletedOrder = await order.remove();
        res.send({ message: 'Order Deleted', product: deletedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'order cannot be deleted' });
    }
  })
);

// orderRouter.put(
//   '/:id/pay',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.payment.paymentResult = {
//         payerID: req.body.payerID,
//         paymentID: req.body.paymentID,
//         orderID: req.body.orderID,
//       };
//       const updatedOrder = await Order.save();
//       res.send({ message: 'Order Paid', order: updatedOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found.' });
//     }
//   })
// );

// orderRouter.post(
//   '/',
//   expressAsyncHandler(async (req, res) => {
//     const order = new Order({
//       orderItems: req.body.orderItems,
//       user: req.user._id,
//       shipping: req.body.shipping,
//       payment: req.body.payment,
//       itemsPrice: req.body.itemsPrice,
//       shippingPrice: req.body.shippingPrice,
//       totalPrice: req.body.totalPrice,
//     });
//     const createdOrder = await order.save();
//     res.status(201).send({ message: 'New Order Created', order: createdOrder });
//   })
// );

orderRouter.put(
  '/:id/deliver',
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await Order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found.' });
      }
    } catch (error) {
      res.status(500).send({ message: 'order cannot be updated' });
    }
  })
);

module.exports = orderRouter;
