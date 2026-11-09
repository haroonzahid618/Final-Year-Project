import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);


import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import resumeRouter from './routes/resumeRoute.js';
import aiRouter from './routes/aiRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
await connectDB();

// Home Route
app.get('/', (req, res) => {
    res.send('Server is live...');
});
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});