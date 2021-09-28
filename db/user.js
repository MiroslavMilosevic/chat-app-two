const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewUserSchema = new Schema
({
username :{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
}
},{timestamps:true});

const User = mongoose.model('User', NewUserSchema );

module.exports = User;