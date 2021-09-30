const Message = require('../db/messages');


async function sendMessageMongoDb(id, other_id,text){

    const message = new Message
    ({
       
        from_id:id,
        to_id:other_id,
        text:text,
        sent_date:new Date()
    });

     let saveResponse = await message.save();
    

          return saveResponse;


}

module.exports = sendMessageMongoDb;