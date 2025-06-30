import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID||"1043456571826-29sh8qlc5ja2hq9atk99nluakqjkqrj0.apps.googleusercontent.com",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET||"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",
  callbackURL: "/auth/google/callback",
},
(accessToken, refreshToken, profile, done) => {
  // You can save user info to DB here
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
