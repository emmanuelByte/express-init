const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URI;
async function connectDB() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected!");
}

module.exports = connectDB;
