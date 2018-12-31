const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

router.all('/*', (req, res, next)=> {
    req.app.locals.layout = 'admin'; 
    next();
});

router.get('/', (req, res)=> {

    Category.find({}).then(categories=>{
        res.render('admin/categories/create', {categories: categories});
    });
});

router.post('/create', (req, res)=>{

    const newCategory = new Category({
        name: req.body.name
    });

    newCategory.save().then(savedCat=>{
        console.log(savedCat);
    });

    res.redirect('/admin/categories');
});

router.get('/edit/:id', (req, res)=>{

    Category.findOne({_id: req.params.id}).then(categories=>{
        res.render('admin/categories/edit', {categories: categories});
    }).catch(err=>{
        if (err) throw err;
    });
});

router.patch('/edit/:id', (req, res)=>{

    Category.findOne({_id: req.params.id}).then(categories=>{

        categories.name = req.body.name;

        categories.save().then(savedCat=>{
            res.redirect('/admin/categories');
        });

    });

});

router.delete('/:id', (req, res)=>{
    Category.findOneAndDelete({_id: req.params.id}).then(categories=>{
        res.redirect('/admin/categories');
    });
});






module.exports = router;