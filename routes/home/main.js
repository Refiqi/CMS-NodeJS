const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');

router.all('/*', (req, res, next)=> {
    req.app.locals.layout = 'home'; 
    next();
});

router.get('/post/:id', (req, res)=>{

    Post.findOne({_id: req.params.id}).then(post=>{
        Category.find({}).then(categories=>{
            
            res.render('home/post', {post: post, categories: categories});
        });
    });

});

router.get('/', (req, res)=> {

    Post.find({}).then(posts=>{

        Category.find({}).then(categories=>{

            res.render('home/index', {posts: posts, categories: categories});
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