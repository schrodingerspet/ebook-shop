import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async () => {
    let uri = process.env.MONGO_URI;

    if (!uri || uri === 'mongodb://127.0.0.1:27017/ebookshop') {
        try {
            console.log("Attempting to connect to local MongoDB...");
            await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/ebookshop', { serverSelectionTimeoutMS: 2000 });
            console.log("MongoDB Connected (Local)");
            return;
        } catch (error) {
            console.log("Local MongoDB not found, starting In-Memory MongoDB...");
            const mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
        }
    }

    await mongoose.connect(uri);
    console.log("MongoDB Connected (In-Memory or Remote)");
};

export default connectDB;
