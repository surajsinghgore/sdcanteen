import mongoose from "mongoose";
let connectionUrl = process.env.DatabaseConnectURL;
 mongoose.set('strictQuery', false);
const DbConnection = async (req, res) => {
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
      ssl: true,
       socketTimeoutMS:43200000,
}, err => {
    if(err) throw err;
})
};



export default DbConnection;
