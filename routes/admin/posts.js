const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const { isEmpty, uploadDir } = require('../../helpers/uploads-helpers');
const fs = require('fs');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {

    Post.find({})
    .populate('category')
    .populate('user')
    .then(posts => {
        res.render('admin/posts', {
            posts: posts
        });
    }).catch(err => {
        res.send(err);
    });
});

router.get('/user', (req, res)=>{

    Post.find({user: req.user.id})
    
    .populate('category')
    .then(posts=>{
        console.log(posts);
        res.render('admin/posts/myPost', {posts: posts});

    }).catch(err=>{
        if (err) throw err;
    });

});

router.get('/create', (req, res) => {

    Category.find({}).then(categories=>{

        res.render('admin/posts/create', {categories: categories});

    });
});

router.post('/create', (req, res) => {

    let filename = 'cat.jpeg';

    if (!isEmpty(req.files)){

        let file = req.files.file;
        filename = Date.now() + '-' + file.name;

        file.mv('./public/uploads/' + filename, (err)=>{
            if (err) throw err;
        });
    } 

    let allowComments = true;

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newPost = new Post({

        user: req.user.id,
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body,
        category: req.body.category,
        file: filename
    });

    newPost.save().then(postSaved => {
        res.redirect('/admin/posts');
    }).catch(err => {
        res.send(err);
    });

});

router.get('/edit/:id', (req, res) => {

    Post.findOne({_id: req.params.id})
    
    .then(post => {
        Category.find({}).then(categories=>{

            res.render('admin/posts/edit', {post: post, categories: categories});
    
        });
    }).catch(err => {
        res.send(err);
    });
});

router.put('/edit/:id', (req, res) => {


    Post.findOne({
        _id: req.params.id
    }).then(post => {


        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }

        post.user = req.user.id;
        post.title = req.body.title;
        post.status = req.body.status;
        post.allowComments = allowComments;
        post.body = req.body.body;
        post.category = req.body.category;

        post.save().then(savedPost => {
            res.redirect('/admin/posts');
        });

    }).catch(err => {
        res.send(err);
    });
});

router.delete('/:id', (req, res) => {
    Post.findOneAndDelete({_id: req.params.id})
    
    .populate('comments')
    .then(post => { 

        if (!post.comments.length < 1){
            post.comments.forEach(comment=>{
                comment.remove();
            });
        }

        fs.unlink(uploadDir + post.file, (err)=>{
            res.redirect('/admin/posts');
        });
    });
});


module.exports = router;