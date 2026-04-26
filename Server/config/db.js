import mongoose from 'mongoose'
import dotenv from 'dotenv'

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://awais:awais@cluster0.4iycr.mongodb.net/?appName=Cluster0")
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

export default connectDB
