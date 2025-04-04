import { Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const User = model('User', new Schema({
                                name: {type: String, required: true},
                                email: {type: String, required: true},
                                username: {type: String, required: true},
                                password: {type: String, required: true},
                            })
            );


const Comments = new Schema({
    userId: {type: ObjectId, required: true},
    comment: {type: String, required: true},
    createdAt: {type: Date, required: true},
}, {timestamps: true});

const Post = model('Post', new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String, required: true},
    codeSnippet: {type: String, required: true},
    createdAt: {type: Date, required: true},
    authorId: {type: ObjectId, required: true, ref: 'User'},
    rating: {
        avgRating: {type: Number, required: true},
        noOfRatings: {type: Number, required: true}
    },
    comments: [Comments],
}, {timestamps: true}))

export {User, Post};