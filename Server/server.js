import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import passport from 'passport';
import session from 'express-session';
import './middlewares/passport.js'; // Make sure this path is correct

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // your frontend domain
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect DB
connectDB();

// API routes
app.use('/api/user', userRoute);
app.use('/api/seller', sellerRoute);

// Root
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Step 1: Start Google Auth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2: Handle callback from Google
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/dashboard', // Redirect to frontend
    failureRedirect: 'http://localhost:5173/login',
  })
);

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
