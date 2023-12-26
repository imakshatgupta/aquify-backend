const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const chatConnect = require("./config/chatConnect");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");

const sessionStore = mongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: "session",
});

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 5 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const templateRoutes = require("./routes/templateRoutes");
const businessRoutes = require("./routes/businessRoutes");
const proofRoutes = require("./routes/proofofFundRoutes");
const googleRoutes = require("./routes/googleRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 5000;
dbConnect();

app.get("/", async (req, res) => {
  res.redirect("http://localhost:3000/aqify#/MainDashboard");
});

app.use("/users", userRoutes);
app.use("/contact", contactRoutes);
app.use("/template", templateRoutes);
app.use("/business", businessRoutes);
app.use("/proof", proofRoutes);
app.use("/auth", googleRoutes);
app.use("/chat", chatRoutes);

const server = app.listen(PORT, () => {
  console.log("server started");
});

chatConnect(server);