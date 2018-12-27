const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const faker = require('faker');

router.all('/*', (req, res, next)=> {
    req.app.locals.layout = 'admin'; 
    next();
});

router.get('/', (req, res)=> {
    res.status(200).render('admin/index');
});

router.post('/generate-fake-post', (req, res)=>{
    

    for(let i = 0; i < req.body.number; i++){

        let post = new Post();

        post.title = faker.name.title();
        post.status = 'public';
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentence();

        post.save(function(err){
            if (err) return err;
        });

    }

    res.redirect('/admin/posts');
});




module.exports = router;