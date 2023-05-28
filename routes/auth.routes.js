    // routes/auth.routes.js

    const { Router } = require('express');
    const router = new Router();
    const User = require('../models/User.model');
    

    // GET route ==> to display the signup form to users
    router.get('/signup', (req, res) => res.render('auth/signup'));


    const bcryptjs = require('bcryptjs');
    const saltRounds = 10;


    // POST route ==> to process form data
    router.post('/signup', (req, res, next) => {
        // console.log("The form data: ", req.body);
    
        const { username,  password } = req.body;
    
        bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
            // username: username
            username,
            
            // passwordHash => this is the key from the User model
            //     ^
            //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
            passwordHash: hashedPassword
            });
        })
        .then(userFromDB => {
            console.log('Newly created user is: ', userFromDB);
            res.redirect('/userProfile');
        })
        .catch(error => next(error));
    });

    router.get('/userProfile', (req, res) => res.render('users/user-profile'));



    ///LOGIN

    router.get('/login', (req, res) => res.render('auth/login'));

    // routes/auth.routes.js
// ... imports and both signup routes stay untouched

//////////// L O G I N ///////////

// GET login route stays unchanged

// POST login route ==> to process form data
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
  
    if (email === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
          return;
        } else if (bcryptjs.compareSync(password, user.passwordHash)) {
          res.render('users/user-profile', { user });
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });
  
  // userProfile route and the module export stay unchanged

  // routes/auth.routes.js
// ... imports and both signup routes stay untouched

//////////// L O G I N ///////////

// GET login route stays unchanged

// POST login route ==> to process form data
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
  
    if (email === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
          return;
        } else if (bcryptjs.compareSync(password, user.passwordHash)) {
          res.render('users/user-profile', { user });
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });
  
  // userProfile route and the module export stay unchanged
  


    

    module.exports = router;
