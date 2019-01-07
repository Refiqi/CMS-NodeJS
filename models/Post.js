const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const PostSchema = new Schema ({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    slug: {
        type: String
    },
    file: {
        type: String
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    status: {
        type: String,
        default: 'public'
    },
    allowComments: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]
}, {usePushEach: true});

PostSchema.plugin(URLSlugs('title', {field: 'slug'}));

module.exports = mongoose.model('posts', PostSchema);