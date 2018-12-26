const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

// Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true }).then( db=> {
    console.log('MongoDB Connected');
}).catch(err=>{
    console.log(err);
});

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
app.use(express.static(path.join(__dirname, 'public')));

// SET Engine
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.listen(5000, ()=>{
    console.log('Connected at 4500');
}); 