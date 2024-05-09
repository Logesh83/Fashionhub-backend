const mongoose=require('mongoose');
const { Schema }=require('mongoose');

const WomenPostSchema = new Schema({
    wname: { type: String  },
    wdescription: { type: String  },
    wimage: { type: String},
    wprice: { type: Number},
    
   });
   
module.exports=mongoose.model("Women",WomenPostSchema) 