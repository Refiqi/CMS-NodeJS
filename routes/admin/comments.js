const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

router.all('/*', (req, res, next)=>{

    req.app.locals.layouts = 'home';
    next();
});

router.get('/', (req, res)=>{

    Comment.find({user: req.user.id})
    .populate('user')
    .then(comments=>{

        res.render('admin/comments/index', {comments: comments});

    });


});

router.post('/', (req, res)=>{

    Post.findOne({_id: req.body.id}).then(post=>{
        
        const newComment = new Comment({

            user: req.user.id,
            body: req.body.body

        });

        post.comments.push(newComment);

        post.save().then(savedPost=>{

            newComment.save().then(savedComment=>{

                req.flash('success_message', 'Comment Posted Successfully');
                res.redirect(`/post/${post.id}`);

            });
        });
    });
});

router.delete('/:id', (req, res)=>{

    Comment.findOneAndDelete({_id: req.params.id}).then(comment=>{

        Post.findOneAndUpdate({comments: req.params.id}, {$pull: {comments: req.params.id}}, (err, data)=>{

            if (err) throw err;

            req.flash('success_message', 'Comments have been Deleted');
            res.redirect('/admin/comments');

        });

    }).catch(err=>{
        if (err) throw err;
    });

});




module.exports = router;