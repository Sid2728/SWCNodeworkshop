const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const keys= require("../keys/keys");

const userSchema= new Schema({
username:{
  type:String,
  required:true
},
password:{
  type:String,
  required:true
}
},{ timestamps: true });



const blogSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
const User= mongoose.model("User",userSchema);
module.exports = {Blog,User};