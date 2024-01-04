const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js");

const authMiddleware = async (req, res, next) => {
    try {
      const bearerToken = req.headers['authorization']  || req.body.headers['authorization'];
      if(!bearerToken) {
        res.status(401);
        throw new Error("Not authorized bearer token failed");
      }
      const token = bearerToken.slice(7);

      console.log(token);
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      let user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
};

module.exports= { authMiddleware };