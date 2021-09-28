
function jwtIsCorrect(jwt){

        const fs = require('fs');
        let raw_token = fs.readFileSync('./data_local/tokens.json');
        let token_array = JSON.parse(raw_token);
        
        token_array = token_array.filter(el=>{
            return el.token === jwt;
        })

        return token_array.length === 1;

}

module.exports = jwtIsCorrect;