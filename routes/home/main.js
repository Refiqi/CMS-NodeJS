const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.status(200).render('home/index');
});

router.get('/about', (req, res)=> {
    res.status(200).render('home/about');
});

router.get('/register', (req, res)=> {
    res.render('home/register');
});

router.get('/login', (req, res)=> {
    res.render('home/login');
});

module.exports = router;