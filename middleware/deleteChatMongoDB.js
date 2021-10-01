const Message = require('../db/messages');


async function deleteChatMongoDb(from, to){
let deleteManyRes = await Message.deleteMany({ from_id: { $in: [from, to] } })
return deleteManyRes;
}

module.exports = deleteChatMongoDb;
