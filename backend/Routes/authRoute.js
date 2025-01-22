const express = require('express');
const { checkAuthenticated, checkNotAuthenticated } = require('../Middleware/middleWare');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const Users=require("../Modules/UserSchema.js");


router.post('/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            // Send a JSON response with an error message if authentication fails
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials', // Customize the message as needed
            });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            // Optionally save session data if necessary
            req.session.loginData = req.body;

            // Send a JSON response indicating login success
            return res.status(200).json({
                success: true,
                message: 'Login successful', // Customize the success message as needed
                user: {
                    firstname: user.First_Name, // You can customize the user object as per your schema
                    lastname: user.Last_Name,
                    email: user.Email,
                    phone: user.Phone,
                    userType: user.UserType,
                },
            });
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
  router.post('/register', async (req, res, next) => {
    const { firstname, lastname, email, phone, usertype, password, confirmpassword, sendmail } = req.body;

    // Check if passwords match
    if (password !== confirmpassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    try {
        // Check if the email is already taken
        const existingUser = await Users.findOne({ Email: email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email is already taken' });
        }

        // Hash the password
        const hashedpass = await bcrypt.hash(password, 10);

        // Save user to the database
        await Users.insertMany({
            First_Name: firstname,
            Last_Name: lastname,
            Email: email,
            Phone: phone,
            UserType: usertype,
            Password: hashedpass,
            Send_Mail: sendmail === 'on',
        });

        // Authenticate the user using Passport.js
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Authentication error', error: err.message });
            }

            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid login credentials' });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Login error', error: err.message });
                }

                // Send a success response
                res.status(200).json({
                    success: true,
                    message: 'Registration successful and user logged in',
                    user: { firstname, lastname, email, phone, usertype },
                });
            });
        })(req, res, next);
    } catch (error) {
        console.error('Error during registration:', error.message);

        // Send an error response
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
});


module.exports = router;
