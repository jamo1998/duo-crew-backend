import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URI = process.env.CONNECTION_URI;

mongoose
  .connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// const axios = require('axios');

// axios
//   .get(
//     'http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/champion.json'
//   )
//   .then((response) => {
//     console.log(response.data.data);
//   });
