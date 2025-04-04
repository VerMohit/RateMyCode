import express from 'express';
const app = express();
import cors from 'cors';                // CORS allows different ports to communicate
import mongoose from 'mongoose';        // Connect Mongoose to MongoDB
import router from './database/route';  // Get all routes for database API

app.use(express.json());                // Middleware to parse JSON requests
app.use(cors()); 


// If app not in production mode, then use the enviornment vars from the .env file
if(process.env.NODE_ENV !== 'production') {
    import('dotenv').then((dotenv) => dotenv.config());
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

if(!CONNECTION) {
    console.error('Connection string is undefined, error connecting to MongoDB');
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
    catch(error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}
startBackend();