import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>{
            console.log("Database connected Successfully")
        })
        let mongodbURL = process.env.MONGODB_URL;
        const projectName = 'resume-builder';

        if (!mongodbURL) {
            throw new Error('MongoDB URL is missing');
        }
if (mongodbURL.endsWith('/')) {
    mongodbURL= mongodbURL.slice(0, -1)
}
await mongoose.connect(`${mongodbURL}/${projectName}`)

    } catch (error) {
        console.log('Error Connecting to MongoDB:', error.message);
    }
};

export default connectDB;