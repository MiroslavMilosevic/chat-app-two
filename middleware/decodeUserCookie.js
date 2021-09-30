function decodeUserCookie(cookie){
      let user_data_cookies = cookie;
  if(cookie){
    user_data_cookies = JSON.parse(cookie);
  }
  return user_data_cookies;
}

module.exports = decodeUserCookie;