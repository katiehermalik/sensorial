
// connection to server
const express = require('express');
const app = express();


// 3rd party modules
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const ejsLayouts = require('express-ejs-layouts');
const multer  = require('multer')

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// set view engine
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// CONTROLLERS
const ctrl = require('./controllers');

// Custom middleware - checking who is logged in and 
// granting views access too that user's document.
app.use('*', (req, res, next) => {
  db.User.findOne({isLoggedin: true}, (err, foundUser) => {
    if (err) return console.log(err);
    res.locals.user = foundUser;
    next();
  });
});

// Middleware
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(morgan(':method :url'));


// Connect to database
const db = require('./models');

// ------------------------------------------------------ Routes

// Root route (landing page)
app.get('/', (req, res) => {
  res.render('./landing');
});

// About route
app.get('/about', (req, res) => {
  res.render('./about');
});

// Contact route
app.get('/contact', (req, res) => {
  res.render('./contact');
});

// POST Create user (sign up modal)
app.post('/', (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err) return console.log(err);
  });
});

// GET Current Prompt
app.get('/currentprompt', (req, res) => {
  const context = {
    user: res.locals.user,
  }
  res.render('currentprompt', context);
});

// PUT Login (updates user 'isloggedin' to true)
app.put('/currentprompt', (req, res) => {
  db.User.findOneAndUpdate({username: req.body.username}, {isLoggedin: true}, 
    {new: true}, (err) => {
    if (err) return console.log(err);
    res.redirect('currentprompt');
  });
});

// GET Logout (updates current user 'isloggedin' to false)
app.get('/logout', (req, res) => {
  db.User.findOneAndUpdate({isLoggedin: true}, {isLoggedin: false}, 
    {new: true}, (err) => {
    if (err) return console.log(err);
    res.redirect('/');
  });
});


// Routes
app.use('/users', ctrl.users);
app.use('/activities', ctrl.activities);

//Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
