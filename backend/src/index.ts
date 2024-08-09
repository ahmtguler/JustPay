import connectDB from './config/database';
import app from './app';
import indexer from './indexer/indexer';
import operator from './operator/operator';
import dotenv from 'dotenv';
dotenv.config();

const startServer = async () => {
  console.log('Starting server...');
  await connectDB();
  console.log('Connected to database');

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  indexer();
  operator();
};

startServer();
