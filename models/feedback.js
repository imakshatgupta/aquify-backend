const mongoose = require ("mongoose");
const feedback = mongoose.Schema(
  {
    username:{
        type:String,
    },
    feed:{
      type:String,
    },
    pic:{
      type:String,
    }
 }
);

module.exports=new mongoose.model("feedback", feedback);
