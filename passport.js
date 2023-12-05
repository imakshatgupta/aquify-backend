const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URI,
        },
        (accessToken, refreshToken, profile, done) =>
        {
            return done(null, profile);
        },
    ),
);
passport.serializeUser((user, done) =>
{
    done(null, user);
});
passport.deserializeUser((user, done) =>
{
    done(null, user);
});

module.exports=passport;