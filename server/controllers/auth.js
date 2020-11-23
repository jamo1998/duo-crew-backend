import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// login user
export const login = async (req, res) => {
  try {
    const { summonerName, password } = req.body;

    if (!summonerName || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    // Check for existing user
    const user = await User.findOne({ summonerName });

    // If user doesn't exist, throw error
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    // Validate Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      // If passwords do not match, throw err
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      // If passwords match, asign a token
      jwt.sign({ id: user.id }, process.env.JWT_SECRET, (err, token) => {
        if (err) throw err;
        res.json({
          token: token,
          user: {
            id: user.id,
            summonerName: user.summonerName,
          },
        });
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET user data from auth/user
export const getUserData = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  res.json(user);
};
