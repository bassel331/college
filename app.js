const axios=require("axios");
const express =require("express");
const mongoose =require("mongoose")
// var favicon = require('serve-favicon');
//const multer =require('multer');
const bodyParser = require('body-parser');
const path=require('path');
const app= express();
const fs = require('fs');
const Users=require("./Modules/UserSchema.js");
// const nodemailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
const servernum=1990;

mongoose.connect("mongodb+srv://admin:zaq12wsxzaq12wsx@college.guzfhu1.mongodb.net/college?retryWrites=true&w=majority",{
    
}  ,console.log("database is connected")
);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });

  app.get('/',async function(req,res){
    await Users.insertMany({First_Name:"amr",Last_Name:"salem",Email:"A7a",Phone:9997979,UserType:true,Password:"amamam",Send_Mail:true}).then(function(){
        console.log("Data inserted")  // Success
      });
  })