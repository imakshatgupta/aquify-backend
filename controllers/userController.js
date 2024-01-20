const User = require("../models/userModel.js");
const Proof = require("../models/proofofFundModel.js");
const Feedback = require("../models/feedback.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);

const generateToken = (user) => {
  const payload = { id: user._id };
  const expiresInDuration = "1d";
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresInDuration,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user);
    res.cookie("token", token);
    res.json({
      _id: user._id,
      userName: user.userName,
      role: user.role,
      token,
    });
  } else {
    res.status(401).json("Invalid Email or Password");
  }
};

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body.formData;
  const { role } = req.body;
  const userExists = await User.findOne({ $or: [{ email }, { userName }] });

  if (userExists) {
    res.status(404).json({ messsage: "Username or Email Already Exist" });
  } else {
    const user = await User.create({ userName, email, password, role });

    if (user) {
      const token = generateToken(user);
      console.log(token);
      res.cookie("token", token);
      res.status(201).json({
        _id: user._id,
        userName: user.userName,
        role: user.role,
        token,
      });
    } else {
      res.status(400);
    }
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.headers["x-auth-token"];

    if (id) {
      const user = await User.findById(id).select("-password -_id");
      const status = await Proof.findOne({ ownerId: id });

      if (user) {
        res.status(200).send({ user, status });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } else {
      res.status(400).send({ message: "Invalid token" });
    }
  } catch (err) {
    console.error("Error decoding token or fetching user: ", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -email -role -pic -about -admin");
    res.status(200).send(users);
  } catch (err) {
    console.error("Error decoding token or fetching user: ", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


const checkUser = async (req, res) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded) {
      res.status(200);
    } else {
      res.status(400);
    }
  } catch (err) {
    console.error("Error decoding token or fetching user: ", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updatePassword = async (req, res) => {
  const id = req.body.id;
  const { oldPassword, confirmnewPassword } = req.body.formData;
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("user not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.matchPassword(oldPassword);


    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    user.password = confirmnewPassword;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    if (userId) {
      const body = req.body.form;
      const updateResult = await User.updateOne({ _id: userId }, body);
      if (updateResult.modifiedCount > 0) {
        return res.status(200).send({ msg: "Record Updated...!" });
      } else {
        return res
          .status(404)
          .send({ error: "No matching record found or no changes made." });
      }
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};

const payment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Acqify",
            },
            unit_amount: 9900,
          },
          quantity: 1,
        },
      ],
      success_url: process.env.FRONTEND_URL + `/#/MainDashboard/Dashbaord`,
      cancel_url: process.env.FRONTEND_URL + `/#/MainDashboard/Dashbaord/error`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
}

const feedback = async (req, res) => {
  try {
    const newFeed = new Feedback({
      basicFeedback: req.body.basicFeedback,
      moreDetails: req.body.moreDetails,
      buildFeedback: req.body.buildFeedback,
      otherFeedback: req.body.otherFeedback,
      username: req.body.username,
      pic: req.body.pic,
      listingName: req.body.listingName,
    })

    console.log(newFeed)
    await newFeed.save();
    res.send({ message: 'Feedback saved successfully!' })

  } catch (error) {
    console.log(error)
  }
}

const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.send(feedbacks);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  loginUser,
  registerUser,
  updatePassword,
  updateProfile,
  getUser,
  checkUser,
  payment,
  feedback,
  getFeedback,
  getAllUsers,
};
