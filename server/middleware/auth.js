import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'You are not authorized to access this page' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

export default auth;
