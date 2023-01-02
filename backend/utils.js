require('dotenv').config();
const jwt = require('jsonwebtoken');

//console.log(process.env.JWT_SECRET);

exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
};

exports.isAuth = (req, res, next) => {
  const bearerToken = req.headers['authorization'];

  
  if (!bearerToken) {
    res.status(401).send({ message: 'Token is not supplied' });
  } else {
    const token = bearerToken.split('Bearer ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        //console.log(data);
        req.user = data;
        next();
      }
    });
  }
};
