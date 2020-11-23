import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Register new user
export const registerUser = async (req, res) => {
  try {
    const {
      summonerName,
      password,
      currentRank,
      mainRole,
      secondaryRole,
    } = req.body;

    if (
      !summonerName ||
      !password ||
      !currentRank ||
      !mainRole ||
      !secondaryRole
    ) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    // Check for existing user
    const user = await User.findOne({ summonerName });

    // If user already exists, throw error
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // If not, create new user
    const newUser = new User({
      summonerName,
      password,
      currentRank,
      mainRole,
      secondaryRole,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser.save().then((user) => {
          jwt.sign({ id: user.id }, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.json({
              token: token,
              user: {
                id: user.id,
                summonerName: user.summonerName,
                currentRank: user.currentRank,
                mainRole: user.mainRole,
                secondaryRole: user.secondaryRole,
              },
            });
          });
        });
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
