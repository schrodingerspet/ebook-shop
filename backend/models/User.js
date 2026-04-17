import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },

    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
}, { timestamps: true });

export default mongoose.model("User", userSchema);