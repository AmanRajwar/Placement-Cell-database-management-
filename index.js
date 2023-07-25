/*imports*/
const express = require('express');
const db = require('./config/mongoose')
const port = 1000;
const expressLayouts= require('express-ejs-layouts');

const app = express();


//used for session cookie
const session =require('express-session');
const passport =require('passport')
const passportLocal =require('./config/passport_local_strategy')
const passportGoogle = require('./config/passport_google_oauth2_strategy');

const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('./assets'));

// set up template engine
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views')



app.use('/', require('./routes'))
app.listen(port, function (err) {
    if (err) {
        console.log("server is not working --->", err)
    }

    console.log('server is up and running on port = ', port);
})




