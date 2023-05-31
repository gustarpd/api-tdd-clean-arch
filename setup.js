import { MongoMemoryServer } from 'mongodb-memory-server';

export default async () => {
  const mongoServer = new MongoMemoryServer();

  const mongoUri = mongoServer.getUri();

  process.env.MONGO_URI = mongoUri;
};