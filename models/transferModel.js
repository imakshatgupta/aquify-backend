const mongoose = require ("mongoose");
const transferSchema = mongoose.Schema(
  {
    startupName:{
        type:String,
    },
    ownerName:{
        type:String,
    },
    ownerEmail:{
        type:String,
    },
    acquirerName:{
        type:String,
    },
    acquirerEmail:{
        type:String,
    },
    payerType:{
        type:String,
    },
 }
);

module.exports=new mongoose.model("transferDatas", transferSchema);