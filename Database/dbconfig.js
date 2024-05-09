const mongoose=require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Mongo db is connected at local host 3001'))
.catch((err)=>console.log(err));

module.exports=mongoose