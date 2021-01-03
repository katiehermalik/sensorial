// connection to server
const express = require('express');
const app = express();

// 3rd party modules
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// set view engine
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// CONTROLLERS
const ctrl = require('./controllers');


// Middleware
app.use(express.static(`${__dirname}/public`));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // expires in two weeks
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2
  },
  store: new MongoStore({ url: process.env.MONGODB_URI })
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(morgan(':method :url'));

// Custom middleware - checking who is logged in and 
// granting views access too that user's document.
app.use((req, res, next) => {
  db.User.findOne({_id: req.session.currentUser}).populate('activities')
  .exec((err, foundUser) => {
    if (err) return console.log(err);
    res.locals.user = foundUser;
    next();
  });
});

// Connect to database
const db = require('./models');

// seed data
const prompt = require('./controllers/promptSeedData')

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
// app.get('/contact', (req, res) => {
//   res.render('./contact');
// });

// GET Current Prompt
app.get('/currentprompt', (req, res) => {
  if (req.session.currentUser) {
    const context = {
      user: res.locals.user,
    }
    res.render('currentprompt', context);
  } else {
    res.redirect('/')
  }
});

// GET Random Prompt
app.get('/randomprompt', (req, res)=>{
  if (req.session.currentUser) {
    randomNum = Math.floor(Math.random() * prompt.length)
    const context = {
      user: res.locals.user,
      prompt: prompt,
      randomNum: randomNum,
    }
    res.render('randomPrompt', context)
  } else {
    res.redirect('/')
  }
});

// Routes
app.use('/users', ctrl.users);
app.use('/activities', ctrl.activities);
app.use('/auth', ctrl.auth);

//Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
