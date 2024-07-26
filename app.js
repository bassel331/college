const axios=require("axios");
const express =require("express");
const mongoose =require("mongoose")
const bodyParser = require('body-parser');
const path=require('path');
const app= express();
const fs = require('fs');
const Users=require("./Modules/UserSchema.js");
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session');
const flash = require('express-flash')
const methodOverride = require('method-override')
// var favicon = require('serve-favicon');
//const multer =require('multer');
// const nodemailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const initializePassport = require('./passport-config.js')
initializePassport(passport ,
  async email=>await Users.findOne({ Email: email }),
  async id=>{await Users.findOne({ _id: id })})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'))
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//   next();
// });


const servernum=1990;

mongoose.connect("mongodb+srv://admin:zaq12wsxzaq12wsx@college.guzfhu1.mongodb.net/college?retryWrites=true&w=majority",{
    
}  ,console.log("database is connected")
);
 
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });

  app.get('/',checkAuthenticated,async(req,res)=>{
    const loginData = req.session.loginData ||{};
    const { email } = loginData;
    const user = await Users.findOne({ Email: email })
    const {First_Name} =user
     res.render('home.ejs',{name: First_Name})
  })  

  app.get('/login',checkNotAuthenticated,(req,res)=>{
    res.render('login.ejs')
  }) 
 
  app.post('/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            } 
            req.session.loginData = req.body;
            res.redirect('/')
        });
    })(req, res, next);
});


  app.get('/register',checkNotAuthenticated,(req,res)=>{
    res.render('register.ejs')
  })   

  app.post('/register',checkNotAuthenticated,async (req,res,next)=>{
    
    const { firstname, lastname, email, phone, usertype, password, confirmpassword, sendmail } = req.body;
    if (password !== confirmpassword) {
      res.redirect('/register')
  }
  else{
    try{
    const hashedpass=await bcrypt.hash(req.body.password,10)
    await Users.insertMany({
      First_Name: firstname,
      Last_Name: lastname, 
      Email: email,
      Phone: phone,
      UserType: usertype,
      Password: hashedpass,
      Send_Mail: sendmail === 'on'
  });
  passport.authenticate('local', (err, user, info) => {
    if (err) {
        return next(err);
    }
    if (!user) {
        return res.redirect('/login');
    }
    req.logIn(user, (err) => {
        if (err) {
            return next(err);
        } 
        // Now you can access req.body and perform additional actions
        req.session.loginData = req.body;
        res.redirect('/')
         // Send req.body or redirect to another route as needed
    });
})(req, res, next);
   } 
   catch (error) {
    
   res.redirect('/register')
}
  }
  }) 

  app.delete('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});  

  function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
      return next()
    }
    res.redirect('/login')
  }

  function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
      return res.redirect('/')
    }
    next()
  } 