const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {

    Post.find({}).then(posts => {
        return res.render('admin/posts', {
            posts: posts
        });
    }).catch(err => {
        res.send(err);
    });
});

router.get('/create', (req, res) => {
    return res.render('admin/posts/create');
});

router.post('/create', (req, res) => {

    let allowComments = true;

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body
    });

    newPost.save().then(postSaved => {
        return res.redirect('/admin/posts');
    }).catch(err => {
        res.send(err);
    });

});

router.get('/edit/:id', (req, res) => {

    Post.findOne({
        _id: req.params.id
    }).then(post => {
        return res.render('admin/posts/edit', {
            post: post
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

        post.title = req.body.title;
        post.status = req.body.status;
        post.allowComments = allowComments;
        post.body = req.body.body;

        post.save().then(savedPost => {
            return res.redirect('/admin/posts');
        });

    }).catch(err => {
        res.send(err);
    });
});

router.delete('/:id', (req, res) => {
    Post.findOneAndDelete({
        _id: req.params.id
    }).then(post => {
        return res.redirect('/admin/posts');
    });
})


module.exports = router;