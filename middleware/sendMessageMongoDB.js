const Message = require('../db/messages');


async function sendMessageMongoDb(body){

    const message = new Message
    ({
       
        from_id:body.from,
        to_id:body.to,
        text:body.text,
        sent_date:new Date()
    });

     let saveResponse = await message.save();
    

          return saveResponse;


}

module.exports = sendMessageMongoDb;