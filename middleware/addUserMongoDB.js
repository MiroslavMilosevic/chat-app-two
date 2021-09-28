const User = require('../db/user');

async function addUserMongoDB(username, password, description){

         
    const user = new User
    ({
    username:username,
    password:password,
    description: description
    });

     let saveResponse = await user.save();
    
     return saveResponse;
    
}

module.exports = addUserMongoDB;