const  mongoose  = require("mongoose");


const postSchema = mongoose.Schema({

  // _id :{ type : String },
  title:{type :String, required:true },
  content:{type :String, required:true },
  image: { type :String, required:true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }


});

module.exports =  mongoose.model('Post',postSchema);
