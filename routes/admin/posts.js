const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {
    res.send('TEST');
    // Post.find({}).then(posts=> {
    //     res.send(posts).catch(err=> {
    //         res.send(err);
    //     });
    // });
});

router.get('/create', (req, res)=> {
    res.render('admin/posts/create');
});

router.post('/create', (req, res)=> {
    res.send('WORK');
});


module.exports = router;