import Users from '../models/Users.js';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//function to handle user registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);

    const user = new Users({ name, email, mobile, password: hashed });
    await user.save();

    res.status(201).json({ message: 'User Registered Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error.', data: error });
  }
};

// Function to handle user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not exists' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' });
    }
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: 'Login Successfull',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

// get user details
export const getUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await Users.findOne({ _id: decoded.userID });
    if (!user) {
      res.status(404).json({ message: 'User Not Found' });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Function to handle user logout
export const logout = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      expires: new Date(0),
    });

    res.status(200).json({ message: 'Logout Successfull' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
