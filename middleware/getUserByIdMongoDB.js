

const User = require('../db/user');
async function getUserByIdMongoDB(id){
       
    let response = await User.findById(id)

    return response;
}

module.exports = getUserByIdMongoDB;