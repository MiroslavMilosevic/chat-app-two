const User = require('../db/user');


async function loginFnk(body) {
    let current_user='';
    // const fs = require('fs');
    // let raw_users_data = fs.readFileSync('./data_local/users.json'); /// data from json file
    //let users_data = JSON.parse(raw_users_data);
     let users_data = await User.find();
    let tmp1 = users_data.filter(user => {
        return user.username === body.username.trim();
    })
    if (tmp1.length <= 0) {
        return [false, current_user];
    } else if (tmp1.length === 1) {
        
        if (tmp1[0].password === body.password.trim()) {
            current_user = tmp1[0];
            return [true, current_user];
            
        } else {
            return [false, current_user];
        }

    } else {
        return [false, current_user];
    }
}

module.exports = loginFnk;