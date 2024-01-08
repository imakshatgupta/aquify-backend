const mongoose = require ("mongoose");
const feedback = mongoose.Schema(
  {
    basicFeedback:{
      type:String,
    },
    moreDetails:{
      type:String,
    },
    buildFeedback:{
      type:String,
    },
    otherFeedback:{
      type:String,
    },
    username:{
        type:String,
    },
    pic:{
      type:String,
    },
    listingName:{
      type:String,
    },
 }
);

module.exports=new mongoose.model("feedback", feedback);
