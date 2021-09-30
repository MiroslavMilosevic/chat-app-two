
const express = require('express');
const app = express();
const CONSTS = require('./data_local/consts')
const loginFnk = require('./middleware/loginFnk')
const cookieParser = require('cookie-parser')
const getMockJwt = require('./middleware/getMockJwt');
const jwtIsCorrect = require('./middleware/jwtIsCorrect');
const mongoose = require('mongoose');
const addUserMongoDB = require('./middleware/addUserMongoDB');
const getUsersMongoDb = require('./middleware/getUsersMongoDb');
const decodeUserCookie = require('./middleware/decodeUserCookie')
const getUserByIdMongoDB = require('./middleware/getUserByIdMongoDB');
const sendMessageMongoDb = require('./middleware/sendMessageMongoDb');
const getMessagesMongoDb = require('./middleware/getMessagesMongoDb')
/////APP.USE AND APP.SET
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
 app.use(express.static('./static'))
//app.use(express.static('./static/js'))
/////APP.USE AND APP.SET


app.get('/login', (req, res) => {
   
   let jwt_status = req.query.jwt_status;
   let login_status = req.query.login_status;
    res.render('login',{statuses:{jwt:jwt_status, login:login_status}});
});

// app.use( async(req,res)=>{

//   //  let response = await sendMessageMongoDb(`61518164fd074fdc7a328de0`,`61518141e720a3fb4a72d439`,`asdfasd`);
//   req.next();
// })

app.post('/login',async (req, res) => {
  let login_response = await loginFnk(req.body);
    if (login_response[0] == true) {
        res.cookie('jwt', getMockJwt(), { maxAge: 1000*160, httpOnly: true });
        res.cookie('user', JSON.stringify(login_response[1]), {maxAge: 1000*160, httpOnly:true})
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
  if(req.cookies.jwt !== undefined && jwtIsCorrect(req.cookies.jwt)){
    let chat_id = req.query.id;
    let other_user = await getUserByIdMongoDB(chat_id);
    let user = decodeUserCookie(req.cookies.user);

    let messages_sorted_desc = await getMessagesMongoDb(user._id,other_user._id);
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
//     addUserMongoDB("user3", "user3", "user3");;
//     res.send({text:"user succsessfuly added"})
// })

app.use((req, res)=>{
    res.json({ status: 'page not found' })
})


const dbURI = 'mongodb+srv://user1:12345@mycluster.dc55z.mongodb.net/chatapp?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  console.log('connected')
  app.listen(process.env.PORT || CONSTS.PORT, () => { console.log("listening at port 3000"); })
}).catch(err => {
  console.log('error hapened');
});