
// connection to server
const express = require('express');
const app = express();

// 3rd party modules
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// set view engine
app.set('view engine', 'ejs');

// CONTROLLERS
const ctrl = require('./controllers');

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

// ------------------------------------------------------ Routes

// Root route (landing page)
app.get('/', (req, res) => {
  res.render('./landing');
});

// Routes
app.use('/users', ctrl.users);
app.use('/activities', ctrl.activities);

//Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));