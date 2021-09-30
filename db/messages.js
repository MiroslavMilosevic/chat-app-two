const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewMessageSchema = new Schema
({
from_id :{
    type:String,
    required:true
},
to_id :{
    type:String,
    required:true
},
text:{
    type:String,
    required:true
},
sent_date:{
    type:String,
    required:true
},

},{timestamps:true});

const Message = mongoose.model('Message', NewMessageSchema );

module.exports = Message;