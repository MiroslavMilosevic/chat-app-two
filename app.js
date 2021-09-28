
const express = require('express');
const app = express();
const CONSTS = require('./data_local/consts')
const loginFnk = require('./middleware/loginFnk')
const cookieParser = require('cookie-parser')
const getMockJwt = require('./middleware/getMockJwt');
const jwtIsCorrect = require('./middleware/jwtIsCorrect');
const mongoose = require('mongoose');
const addUserMongoDB = require('./middleware/addUserMongoDB');

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

app.post('/login',async (req, res) => {
  let login_response = await loginFnk(req.body);
  console.log(login_response);
    if (login_response[0] == true) {
        res.cookie('jwt', getMockJwt(), { maxAge: 1000*60, httpOnly: true });
        res.cookie('user', JSON.stringify(login_response[1]), {maxAge: 1000*60, httpOnly:true})
        res.redirect('/home')
    } else {
         res.redirect(`/login?login_status=${"username or password incorrect"}`);
    }

})

app.get('/home', (req, res)=>{

    if(req.cookies.jwt !== undefined && jwtIsCorrect(req.cookies.jwt)){
    res.render('home',{jwt:req.cookies.jwt});
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
//     addUserMongoDB("w", "w", "w");
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