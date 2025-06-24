import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;
import authRoute from './routes/UserRoutes.js';

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);

app.get('/api/auth', (req, res) => {
  res.send('The User is available 2222!');
});

app.listen(PORT, () => {
  connectDB();
  console.log('Serever is running on Port:', PORT);
});
