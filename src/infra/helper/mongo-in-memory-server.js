import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoDb

export const connect = async ()=> {
  mongoDb = await MongoMemoryServer.create();
  const uri = mongoDb.getUri();
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
};
export const disconnect = async () => {
  await mongoose.disconnect();
  await mongoDb.stop();
};