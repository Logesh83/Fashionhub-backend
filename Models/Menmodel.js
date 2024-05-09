const mongoose=require('mongoose');
const { Schema }=require('mongoose');

const MenPostSchema = new Schema({
    mname: { type: String  },
    mdescription: { type: String  },
    mimage: { type: String},
    mprice: { type: Number},
    
   });
   
module.exports=mongoose.model("Men",MenPostSchema) 