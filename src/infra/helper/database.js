import { connect as mongooseConnect, connection } from 'mongoose';

export const connect = async ()=> {
  await mongooseConnect(process.env.DATABASE_URL);
};

export const close = () => connection.close();