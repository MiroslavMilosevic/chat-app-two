
const express = require('express');
const app = express();
const CONSTS = require('./data_local/consts');
const loginFnk = require('./middleware/loginFnk');
const cookieParser = require('cookie-parser');
const getMockJwt = require('./middleware/getMockJwt');
const jwtIsCorrect = require('./middleware/jwtIsCorrect');
const mongoose = require('mongoose');
const addUserMongoDB = require('./middleware/addUserMongoDB');
const getUsersMongoDb = require('./middleware/getUsersMongoDb');
const decodeUserCookie = require('./middleware/decodeUserCookie');
const getUserByIdMongoDB = require('./middleware/getUserByIdMongoDB');
const sendMessageMongoDb = require('./middleware/sendMessageMongoDb');
const getMessagesMongoDb = require('./middleware/getMessagesMongoDb');
const deleteChatMongoDb = require('./middleware/deleteChatMongoDb');
require('dotenv').config()
// const prepareForStringyfy = require('./middleware/prepareForStringyfy')

/////APP.USE AND APP.SET
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
 app.use(express.static('./static'));
 app.use(express.json());
//app.use(express.static('./static/js'))
/////APP.USE AND APP.SET


app.get('/login', (req, res) => {
   
   let jwt_status = req.query.jwt_status;
   let login_status = req.query.login_status;
   console.log(jwt_status, login_status);
    res.render('login',{statuses:{jwt:jwt_status, login:login_status}});
});

// app.use( async(req,res)=>{

//   //  let response = await sendMessageMongoDb(`61518164fd074fdc7a328de0`,`61518141e720a3fb4a72d439`,`asdfasd`);
//   req.next();
// })

app.post('/login',async (req, res) => {
  let login_response = await loginFnk(req.body);
    if (login_response[0] == true) {
        res.cookie('jwt', getMockJwt(), { maxAge: 1000*360, httpOnly: true });
        res.cookie('user', JSON.stringify(login_response[1]), {maxAge: 1000*360});
        // res.cookie('blabla', "adsfasdfads", {maxAge: 1000*60})

        res.redirect('/home')
    } else {
         res.redirect(`/login?login_status=${"username or password incorrect"}`);
    }

})

app.get('/home', async(req, res)=>{
    if(req.cookies.jwt !== undefined && jwtIsCorrect(req.cookies.jwt)){
    let users = await getUsersMongoDb();
    let user = decodeUserCookie(req.cookies.user);
    res.render('home',{jwt:req.cookies.jwt, users:users, user:user});
    }else{
        res.redirect(`/login?jwt_status=${"your session has expried or you have wrong session id"}`)
    }

})

app.get('/chat', async(req, res)=>{
    
  if(req.query.id && req.cookies.jwt !== undefined && jwtIsCorrect(req.cookies.jwt)){
    let chat_id = req.query.id;
    // console.log("__________________________________________________________________");
    // console.log(chat_id, typeof chat_id);
    // console.log("__________________________________________________________________");
    let other_user = await getUserByIdMongoDB(chat_id);

if( ! other_user){
    res.redirect(`/login?jwt_status=${"you should not acess chat via url"}`)
}
    let user = decodeUserCookie(req.cookies.user);

    let messages_sorted_desc = await getMessagesMongoDb(user._id,other_user._id);
    // console.log(user,other_user);
        res.render('chat', {other_user:other_user, user:user, messages:messages_sorted_desc});
    }else{
        res.redirect(`/login?jwt_status=${"your session has expried or you have wrong session id"}`)
    }
      
})


app.get("/",(req, res) => {
    if(req.cookies.jwt !== undefined && jwtIsCorrect(req.cookies.jwt)){
        res.redirect('/home');
        }else{
            res.redirect(`/login`)
        }

})

// app.get('/add-user', (req, res)=>{
//     addUserMongoDB("John", "John123", "John");
//     addUserMongoDB("Jennifer", "Jennifer123", "Jennifer");
//     addUserMongoDB("Richard", "Richard123", "Richard");
//     addUserMongoDB("Mark", "Mark123", "Mark");
//     addUserMongoDB("Helen", "Helen123", "Helen");
//     addUserMongoDB("Stephen", "Stephen123", "Stephen");
//     res.send({text:"user succsessfuly added"})
// })

app.post('/send-message', async(req, res)=>{
    let writen_message = await sendMessageMongoDb(req.body.message)
    let query_id = req.body.message.query_id;
    let user = decodeUserCookie(req.cookies.user);
    let updated_messages = await getMessagesMongoDb(user._id, query_id);
    res.json(updated_messages);
});

// app.get("/test",async(req, res)=>{
//    let deleteChatRes = deleteChatMongoDb('61518164fd074fdc7a328de0','61518141e720a3fb4a72d439')
// //    let test_data = await getMessagesMongoDb("61518164fd074fdc7a328de0", "61518141e720a3fb4a72d439");
//    console.log(deleteChatRes);
// })

app.get("/msg-api", async(req, res)=>{
    console.log("__________________________________________________________________");
    console.log("this is id of user:",req.query.id_user);
    console.log("this is id of other:",req.query.id_other);
    console.log("__________________________________________________________________");
    let updated_messages = await getMessagesMongoDb(req.query.id_user, req.query.id_other);
    res.json(updated_messages)
})
app.get('/logout', async(req, res)=>{

    res.clearCookie("user");   
    res.clearCookie("jwt");   
    res.json({message : "all cookies cleared"})

})

app.use((req, res)=>{
    res.json({ status: 'page not found' })
})

const dbURI = process.env.DB_CONNECTION;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  console.log('connected')
  const PORT = process.env.PORT || CONSTS.PORT;
  app.listen(PORT, () => { console.log(`listening at port ${PORT}`); })
}).catch(err => {
  console.log('error hapened');
});