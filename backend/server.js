const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://rahul2000daksha:Rdaksha1210%40@cluster0.uncxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected Successfully')
})

mongoose.connection.on('error', (err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
});

app.use('/api/tasks',taskRoutes);

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});