import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    image: String,
    description: String,
    category: String,
    stock: Number,

    pdfUrl: String,
    preview: String,
    summary: String
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);