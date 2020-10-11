
// connection to server
const express = require('express');
const app = express();

// 3rd party modules
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// set view engine
app.set('view engine', 'ejs');

// CONTROLLERS
const ctrl = require('./controllers');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(morgan(':method :url'));

// ------------------------------------------------------ Routes

// Root route (landing page)
app.get('/', (req, res) => {
  res.render('./landing');
});

// About route
app.get('/about', (req, res) => {
  res.render('./about');
});

//Contact route
app.get('/contact', (req, res) => {
  res.render('./contact');
});

// Routes
app.use('/users', ctrl.users);
app.use('/activities', ctrl.activities);

//Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
