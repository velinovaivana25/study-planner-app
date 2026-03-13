
const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({

title:{
type:String,
required:true,
trim:true
},

subject:{
type:mongoose.Schema.Types.ObjectId,
ref:"Subject",
required:true
},

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

dueDate:{
type:Date
},

priority:{
type:String,
enum:["Low","Medium","High"],
default:"Medium"
},

completed:{
type:Boolean,
default:false
}

},
{timestamps:true}
)

module.exports = mongoose.model("Task",TaskSchema)

