import mongoose from "mongoose";
let connectionUrl = process.env.DatabaseConnectURL;
 mongoose.set('strictQuery', false);
const DbConnection = async (req, res) => {
 
 mongoose.connect(
    connectionUrl, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        try {
           
        } catch (err) {
            throw err;
        }
    });
};



export default DbConnection;
