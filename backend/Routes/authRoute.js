const express = require('express');
const { checkAuthenticated, checkNotAuthenticated } = require('../Middleware/middleWare');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const Users=require("../Modules/UserSchema.js");

router.get('/login', checkNotAuthenticated, (req, res) => res.render('login'));
router.post('/login', checkNotAuthenticated, (req, res, next) => {
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
router.delete('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
}); 
router.get('/register',checkNotAuthenticated,(req,res)=>{
    res.render('register.ejs')
  });
router.post('/register',checkNotAuthenticated,async (req,res,next)=>{
    
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
        req.session.loginData = req.body;
        res.redirect('/')
    });
})(req, res, next);
   } 
   catch (error) {

   res.redirect('/register')
}
  }
  }) 

module.exports = router;
