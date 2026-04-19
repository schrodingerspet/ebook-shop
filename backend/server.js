import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    res.send("API is running...");
});


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
});
