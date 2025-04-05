import { Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

// Note: The name we use for model MUST match the collection name in Atlas!
const User = model('users', new Schema({
                                name: {type: String, required: true},
                                email: {type: String, required: true},
                                username: {type: String, required: true},
                                password: {type: String, required: true},
                            })
            );


const Comments = new Schema({
    userId: {type: ObjectId, required: true},
    comment: {type: String, required: true},
}, {timestamps: true});

const Post = model('Posts', new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String, required: true},
    codeSnippet: {type: String, required: true},
    authorId: {type: ObjectId, required: true, ref: 'User'},
    rating: {
        avgRating: {type: Number, required: true},
        noOfRatings: {type: Number, required: true}
    },
    comments: [Comments],
}, {timestamps: true}))

export {User, Post};