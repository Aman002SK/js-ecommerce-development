const User = require('../models/userModel');
const express = require('express');
const bcrypt = require('bcrypt');
const expressAsyncHandler = require('express-async-handler');
const { generateToken } = require('../utils');
const { isAuth } = require('../utils');
// const { showMessage } = require('../../client/src/utils');

const userRouter = express.Router();


userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    let signinUser;
    try {
      signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }

    if (!signinUser) {
      res.status(401).send({ message: 'Invalid Email or Password' });
    } else {
      res.send({
        _id: signinUser._id,
        name: signinUser.name,
        email: signinUser.email,
        token: generateToken(signinUser),
      });
    }
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    try {
      const userExists = await User.find({ email: req.body.email });

      if (userExists.length > 0) {
        return res.status(401).send({ message: 'Email already in use' });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    user.save((err, data) => {
      if (err) res.status(401).send({ message: 'Invalid Email or Password' });
      //console.log(data);

      let token = generateToken(data);

      res.send({
        //_id: data._id,
        name: data.name,
        email: data.email,
        token,
      });
    });
  })
);

userRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).send({ message: 'user not found' });
      } else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();

        // let token = generateToken(data);

        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser),
        });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  })
);

module.exports = userRouter;
