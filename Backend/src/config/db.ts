import mongoose from "mongoose";
import { MONGO_URI } from "./env.ts";


export const ConnectDB = async (): Promise<typeof mongoose> => {
  await mongoose.connect(MONGO_URI);
  console.log("[db] connected");
  return mongoose;
};

/** Closes the connection during graceful shutdown. */
export const closeDB = async (): Promise<void> => {
  await mongoose.connection.close();
  console.log("[db] connection closed");
};
