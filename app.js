const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');


app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars')

app.get('/', (req, res)=> {
    res.status(200).render('home/index');
});

app.get('/about', (req, res)=> {
    res.status(200).render('home/about');
});

app.listen(4500, ()=>{
    console.log('Connected at 4500');
}); 