const mongoose = require ("mongoose");

const templateSchema = mongoose.Schema(
  {
    websiteImage: {
      type: String,
      required: true,
    },
    websiteName:{
     type:String,
     required:true
    },
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
     required:true,
    },
    ownerImage:{
      type:String,
      required:true
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    businessType:{
        type:String,
        required:true,
    },
    location:{
        type:Array,
        required:true,
    },
    acquisitionType:{
        type:String,
        required:true,
    },
    amount:{
      type:String,
      required:true
    }
 }
);

module.exports=new mongoose.model("templateDatas", templateSchema);