const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    
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
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }
});

module.exports = mongoose.model('posts', PostSchema);