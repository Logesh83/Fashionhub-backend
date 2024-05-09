const mongoose=require('mongoose');
const { Schema }=require('mongoose');

const KidsPostSchema = new Schema({
    kname: { type: String  },
    kdescription: { type: String  },
    kimage: { type: String},
    kprice: { type: Number},
    
   });
   
module.exports=mongoose.model("Kids",KidsPostSchema) 