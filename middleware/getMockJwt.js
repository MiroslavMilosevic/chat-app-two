
function getMockJwt(){

    const fs = require('fs');
    let raw_token = fs.readFileSync('./data_local/tokens.json');
    let token_array = JSON.parse(raw_token);
  
    return token_array[Math.floor(Math.random() * 6)].token
}

module.exports = getMockJwt;