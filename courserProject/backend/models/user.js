const  mongoose  = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({

  // _id :{ type : String },
  email:{type :String, required:true, unique:true},
  password:{type :String, required:true },

});


userSchema.plugin(uniqueValidator);
module.exports =  mongoose.model('User',userSchema);
