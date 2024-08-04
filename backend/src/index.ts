import connectDB from './config/database';
import app from './app';
import indexer from './indexer/indexer';
import operator from './operator/operator';
import dotenv from 'dotenv';
dotenv.config();

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  indexer();
  operator();
};

startServer();
