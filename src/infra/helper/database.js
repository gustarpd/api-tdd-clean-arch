import pkg from 'mongoose';
const { connect: mongooseConnect, connection } = pkg;

export const connect = async (uri)=> {
  await mongooseConnect(uri);
};

export const close = () => connection.close();