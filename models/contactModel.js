const mongoose = require ("mongoose");
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message:{
        type:String,
        required:true
    }
 }
);

module.exports=new mongoose.model("contactDatas", contactSchema);
