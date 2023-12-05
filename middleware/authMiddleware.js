const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js");

const authMiddleware = async (req, res, next) => {
    try {
      const token=req.cookies.token;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      let user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
};

module.exports= { authMiddleware };