import express from 'express';
const app = express();
import cors from 'cors';                // CORS allows different ports to communicate
import mongoose from 'mongoose';        // Connect Mongoose to MongoDB
import router from './api_endpoints/route';  // Get all routes for database API
import dotenv from 'dotenv';

// If app not in production mode, then use the enviornment vars from the .env file
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

app.use(express.json());                // Middleware to parse JSON requests
app.use(cors()); 

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

if(!CONNECTION) {
    console.error('Error: MongoDB connection string (CONNECTION) is not defined in environment variables.');
    process.exit(1);
}

app.use('/api/database', router);

// Starting up of the DB from MongoDB Atlas
const startBackend = async() => {
    try{
        // Wait for mongoose to connect to the CPS630 DB created on Atlas
        await mongoose.connect(CONNECTION)
            .then(() => console.log('MongoDB connected successfully'))

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch(error: any) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}
startBackend();

// Gracefully shutdown db, when we press ctrl+C or cmd+C
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await mongoose.disconnect();
    process.exit(0);
});
