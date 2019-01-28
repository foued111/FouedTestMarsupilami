const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

// Register Proccess
router.post('/register', function(req, res){
  const id = req.body.id;
  const famille = req.body.famille;
  const age = req.body.age;
  const race = req.body.race;
  const nourriture = req.body.nourriture;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('id', 'id is required').notEmpty();
  req.checkBody('famille', 'famille is required').notEmpty();
  req.checkBody('age', 'age is required').notEmpty();
  req.checkBody('race', 'race is required').notEmpty();
  req.checkBody('nourriture', 'nourriture is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      id:id,
      famille:famille,
      age:age,
      race:race,
      nourrite:nourriture,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/marsupilami/login');
          }
        });
      });
    });
  }
});

// Login Form
router.get('/login', function(req, res){
  res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/marsupilami/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/marsupilami/login');
});

module.exports = router;