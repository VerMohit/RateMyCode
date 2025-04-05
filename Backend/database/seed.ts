import mongoose from 'mongoose';
import { User, Post } from './model'; // Update with your actual schema file path
import dotenv from 'dotenv';

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        if (process.env.NODE_ENV !== 'production') {
            dotenv.config();
        }

        const CONNECTION = process.env.CONNECTION;

        if(!CONNECTION) {
            console.error('Error: MongoDB connection string (CONNECTION) is not defined in environment variables.');
            process.exit(1);
        }

        try{
            // Wait for mongoose to connect to the CPS630 DB created on Atlas
            await mongoose.connect(CONNECTION)
                .then(() => console.log('MongoDB connected successfully'))
        }
        catch(error: any) {
            console.error('Error connecting to MongoDB:', error.message);
            process.exit(1);
        }

        // Clear existing data
        await User.deleteMany({});
        await Post.deleteMany({});

        // Create users
        const users = await User.insertMany([
            {
                name: 'John Doe',
                email: 'john@example.com',
                username: 'johndoe',
                password: 'password123'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                username: 'janesmith',
                password: 'password123'
            },
            {
                name: 'Bob Johnson',
                email: 'bob@example.com',
                username: 'bobjohnson',
                password: 'password123'
            },
            {
                name: 'Alice Williams',
                email: 'alice@example.com',
                username: 'alicewilliams',
                password: 'password123'
            }
        ]);

        // Create posts for each user with comments
        const posts = [];
        for (const user of users) {
            // Create 2 posts per user
            for (let i = 1; i <= 2; i++) {
                const post = new Post({
                    title: `Post ${i} by ${user.name}`,
                    slug: `post-${i}-by-${user.username}`,
                    description: `This is post number ${i} by ${user.name}`,
                    codeSnippet: `console.log("Hello from ${user.name}'s post ${i}");`,
                    authorId: user._id,
                    rating: {
                        avgRating: Math.floor(Math.random() * 5) + 1,
                        noOfRatings: Math.floor(Math.random() * 100)
                    },
                    comments: [
                        {
                            userId: users[(users.indexOf(user) + 1) % users.length]._id, // Comment from next user
                            comment: `Great post ${i}, ${user.name}!`
                        },
                        {
                            userId: users[(users.indexOf(user) + 2) % users.length]._id, // Comment from user after next
                            comment: `Interesting content in post ${i}. Thanks for sharing!`
                        }
                    ]
                });
                posts.push(post);
            }
        }

        // Insert all posts
        await Post.insertMany(posts);

        console.log(' ✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
