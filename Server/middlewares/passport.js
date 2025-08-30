import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import userModel from '../models/userModel.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || "your-client-id",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "your-client-secret",
  callbackURL: "/auth/google/callback",
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name: profile.displayName,
        email,
        password: "google-oauth",
        isVerified: true
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
