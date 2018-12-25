const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const main = require('./routes/home/main');

app.use('/', main);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.listen(4500, ()=>{
    console.log('Connected at 4500');
}); 