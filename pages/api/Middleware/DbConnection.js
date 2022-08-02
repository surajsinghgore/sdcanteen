import mongoose from "mongoose";
let connectionUrl = process.env.DatabaseConnectURL;

const DbConnection = async (req, res) => {
  try {
    await mongoose.connect(connectionUrl);
  } catch (error) {
    console.log(error);
  }
};

export default DbConnection;
