const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const User = require('../../models/User');


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

router.get('/post/:id', (req, res) => {

    Post.findOne({
        _id: req.params.id
    }).then(post => {
        Category.find({}).then(categories => {

            res.render('home/post', {
                post: post,
                categories: categories
            });
        });
    });

});

router.get('/', (req, res) => {

    Post.find({}).then(posts => {

        Category.find({}).then(categories => {

            res.render('home/index', {
                posts: posts,
                categories: categories
            });
        });
    }).catch(err => {
        if (err) throw err;
    });

});

router.get('/about', (req, res) => {
    res.status(200).render('home/about');
});

router.get('/register', (req, res) => {
    res.render('home/register');
});

router.post('/register', (req, res) => {

    let errors = [];

    if (req.body.password !== req.body.passwordConfirm) {
        errors.push({
            message: "Password field doesn't match"
        });
    }

    if (errors.length > 0) {
        res.render('home/register', {
            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
    } else {

        User.findOne({
            email: req.body.email
        }).then(user => {
            if (!user) {

                const newUser = new User({

                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(savedUser => {
                            req.flash('success_message', 'You have been registered, Please Log-in');
                            res.redirect('/login');
                        }).catch(err => {
                            if (err) res.send(err);
                        });
                    });
                });
            } else {
                req.flash('errors_message', 'Email already exist, please register a new email');
                res.redirect('/register');
            }
        });

    }
});






router.get('/login', (req, res) => {

    res.render('home/login');
});

router.post('/login', (req, res) => {


    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matched) => {
                if (err) throw err;
                matched ? res.send('Logged-in') : res.send('Not Logged-in');
            });
        }
    });
});

module.exports = router;