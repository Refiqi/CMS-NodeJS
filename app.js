const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Database Remote mLab
const { mongoDbUrl } = require('./config/database');
const mongoose = require('mongoose');
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true
}).then(db => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.log(err);
});

// Database Localhost
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/cms', {
//     useNewUrlParser: true
// }).then(db => {
//     console.log('MongoDB Connected');
// }).catch(err => {
//     console.log(err);
// });

// Method Override

app.use(methodOverride('_method'));


// File Upload

app.use(upload());

// Session and Flash
app.use(session({
    secret: 'refiqi',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Creating Local Variables with middleware
app.use((req, res, next)=>{

    res.locals.user = req.user || null;
    res.locals.success_message = req.flash('success_message');
    res.locals.errors_message = req.flash('errors_message');
    res.locals.error = req.flash('error');


    next();
});

// Load Routes
const main = require('./routes/home/main');
const admin = require('./routes/admin/admin');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');
const comments = require('./routes/admin/comments');

// Use Routes
app.use('/', main);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);
app.use('/admin/comments', comments);

// Use Style and JS
app.use('/post', express.static('public'));
app.use('/admin', express.static('public'));
app.use('/admin/posts', express.static('public'));
app.use('/admin/categories', express.static('public'));
app.use('/admin/categories/edit', express.static('public'));
app.use('/admin/posts/edit', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// SET Engine

const {
    select, generateTime, paginate
} = require('./helpers/handlebars-helpers');

app.engine('handlebars', exphbs({
    defaultLayout: 'home',
    helpers: {
        select: select,
        generateTime: generateTime,
        paginate: paginate
    }
}));
app.set('view engine', 'handlebars');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});