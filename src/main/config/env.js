import dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URI,
  tokenSecret: process.env.TOKEN_SECRET || 'secret'
};
