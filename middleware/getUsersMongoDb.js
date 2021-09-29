const User = require('../db/user');


async function getUsersMongoDb(){
       
    let response = await User.find();

    return response;


}

module.exports = getUsersMongoDb;