const User = require("../models/userModel.js");
const router = require("express").Router();
const passport = require("../passport");
const jwt = require("jsonwebtoken"); 


function generatePin() {
    const pinLength = 6; 
    let pin = '';
    for (let i = 0; i < pinLength; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    return pin;
}

router.get("/google", (req, res, next) => {
    const role = req.query.role;
    res.cookie('role', role);
    next();
}, passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/failedlogin" }), (req, res) => {
    req.session.user = req.user;
    req.session.email = req.user.emails[0].value;
    res.redirect("/auth/success");
});

router.get("/failedlogin", (req, res) => {
    return res.json({ status: "Login Unsuccessful" });
});

router.get("/success", async (req, res) => {
    const role = req.cookies.role;
    let email = req.session.user.emails[0].value;
    let data = await User.findOne({ email: email });
    if (!data) {
        let password = generatePin();
        let saveuser = new User({ userName: req.session.user.displayName, email: email, password: password, role: role });
        let response = await saveuser.save();
        console.log("response /success", response);
    }
    res.clearCookie('user');
    const payload = { id: data._id };
    const expiresInDuration = '1d';
    const token=jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresInDuration });
    res.cookie('token', (token, { expiresIn: expiresInDuration }));
    return res.redirect("/");
});

module.exports = router;
