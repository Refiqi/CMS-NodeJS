const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.all('/*', (req, res, next)=> {
    req.app.locals.layout = 'home'; 
    next();
});

router.get('/post/:id', (req, res)=>{

    Post.findOne({_id: req.params.id}).then(post=>{
        res.render('home/post', {post: post});
    });

});

router.get('/', (req, res)=> {

    Post.find({}).then(posts=>{
        res.render('home/index', {
            posts: posts
        });
    }).catch(err=>{
        if(err) throw err;
    });

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