const Message = require('../db/messages');



async function getMessagesMongoDb(from_id, to_id){
    



   let queryed_messages = await Message
   .find({ from_id: { $in: [from_id, to_id] } })
   .find({ to_id: { $in: [from_id, to_id] } }).sort({"createdAt": 1})


         console.log(queryed_messages.length);
return queryed_messages;
}


module.exports = getMessagesMongoDb;