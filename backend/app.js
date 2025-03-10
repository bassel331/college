const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
const Users = require("./Modules/UserSchema.js");
const session = require('express-session');
const flash = require('express-flash')
const methodOverride = require('method-override')
const cors = require('cors');
require('dotenv').config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('Views', path.join(__dirname, 'Views'));
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: "amr",
  resave: false,
  saveUninitialized: false
}))
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('./passport-config.js')
initializePassport(passport,
  async email => await Users.findOne({ Email: email }),
  async id => { await Users.findOne({ _id: id }) }
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors());

const { checkAuthenticated, checkNotAuthenticated } = require('./Middleware/middleWare');


app.use('/', require('./Routes/authRoute'));
app.use('/universities', require('./Routes/universitiesRoute'));
app.use('/admin', require('./Routes/AdminRoute'));
const servernum = 3030;

mongoose.connect("mongodb+srv://admin:zaq12wsxzaq12wsx@college.guzfhu1.mongodb.net/college?retryWrites=true&w=majority", {

}, console.log("database is connected")
);

const PORT = process.env.PORT || servernum;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});




