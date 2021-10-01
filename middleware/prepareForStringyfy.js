

function prepareForStringyfy(user){

    user.description = user.description.trim().replace(/ /g, "|");

    return user;
}

module.exports = prepareForStringyfy;