const Message = require('../db/messages');



async function deleteMessagesMongoDB(from_id, to_id, num_of_messages) {

      let queryed_messages = [];
      if (num_of_messages > 15) {
            queryed_messages = await Message
                  .find({ from_id: { $in: [from_id, to_id] } })
                  .find({ to_id: { $in: [from_id, to_id] } }).sort({ "createdAt": 1 }).limit(10);
      }

      if (queryed_messages.length > 0)
            console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
      console.log(queryed_messages.length);
      console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
      for (let i = 0; i < queryed_messages.length; i++) {
            let deleted = await Message.deleteOne({ "_id": `${queryed_messages[i]._id}` });
            console.log(deleted);
      }
      {
      }


      return queryed_messages;
}


module.exports = deleteMessagesMongoDB;

