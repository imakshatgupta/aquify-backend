const mongoose = require ("mongoose");
const proofofFundSchema = mongoose.Schema(
  {
    ownerName:{
        type:String,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    },
    ownerEmail:{
        type:String,
        required:true
    },
    businessName: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    location:{
        type:String,
        required:true
    },
    document:{
        type:String,
        required:true
    },
    status:{
      type:String,
      default:"pending"
    }
 }
);

module.exports=new mongoose.model("proofofFundDatas", proofofFundSchema);
