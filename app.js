const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cms', {
    useNewUrlParser: true
}).then(db => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.log(err);
});

// Method Override

app.use(methodOverride('_method'));

// Load Routes
const main = require('./routes/home/main');
const admin = require('./routes/admin/admin');
const posts = require('./routes/admin/posts');

// Use Routes
app.use('/', main);
app.use('/admin', admin);
app.use('/admin/posts', posts);

// Use Style and JS
app.use('/admin', express.static('public'));
app.use('/admin/posts', express.static('public'));
app.use('/admin/posts/edit', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// SET Engine

const {
    select
} = require('./helpers/handlebars-helpers');

app.engine('handlebars', exphbs({
    defaultLayout: 'home',
    helpers: {
        select: select
    }
}));
app.set('view engine', 'handlebars');

const port = process.env.PORT || 5000

app.listen(port, () => {
    var port1 = server.address().port;
  console.log("Express is working on port " + port1);
});