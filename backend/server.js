const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://your-frontend-url.netlify.app'], // Add your frontend URLs here
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // If you need to allow cookies or authentication headers
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb+srv://rahul2000daksha:Rdaksha1210%40@cluster0.uncxt.mongodb.net/test?retryWrites=true&w=majority&ssl=true&appName=Cluster0');

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected Successfully')
})

mongoose.connection.on('error', (err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
});

app.use('/api/tasks', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});